const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const secrets = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
  'RESEND_API_KEY',
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'AWS_BACKUP_BUCKET',
  'AWS_REGION',
  'NEXT_PUBLIC_APP_URL',
  'SENTRY_DSN'
];

function checkGitHubCLI() {
  try {
    execSync('gh --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

function checkGitHubAuth() {
  try {
    execSync('gh auth status', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

async function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function setupSecrets() {
  console.log('🔐 Setting up GitHub secrets...\n');

  // Check if GitHub CLI is installed
  if (!checkGitHubCLI()) {
    console.error('❌ GitHub CLI is not installed. Please install it first:');
    console.error('Windows: scoop install gh');
    console.error('macOS: brew install gh');
    console.error('Linux: sudo apt install gh');
    process.exit(1);
  }

  // Check if user is authenticated
  if (!checkGitHubAuth()) {
    console.log('⚠️  You are not authenticated with GitHub CLI.');
    const shouldAuth = await askQuestion('Would you like to authenticate now? (y/n): ');
    
    if (shouldAuth.toLowerCase() === 'y') {
      try {
        execSync('gh auth login', { stdio: 'inherit' });
      } catch (error) {
        console.error('❌ GitHub authentication failed.');
        process.exit(1);
      }
    } else {
      console.log('❌ GitHub authentication is required to set up secrets.');
      process.exit(1);
    }
  }

  // Get repository name
  const repo = await askQuestion('Enter your GitHub repository name (e.g., username/repo): ');
  
  // Read .env file
  const envPath = path.join(__dirname, '../.env');
  if (!fs.existsSync(envPath)) {
    console.error('❌ .env file not found. Please run setup-env.js first.');
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = envContent.split('\n').reduce((acc, line) => {
    const [key, value] = line.split('=');
    if (key && value) {
      acc[key.trim()] = value.trim().replace(/^"|"$/g, '');
    }
    return acc;
  }, {});

  // Set up secrets
  console.log('\n📦 Setting up secrets...');
  
  for (const secret of secrets) {
    if (envVars[secret]) {
      try {
        console.log(`Setting ${secret}...`);
        execSync(`gh secret set ${secret} -R ${repo} -b"${envVars[secret]}"`, { stdio: 'ignore' });
        console.log(`✅ ${secret} set successfully`);
      } catch (error) {
        console.error(`❌ Failed to set ${secret}:`, error.message);
      }
    } else {
      console.log(`⚠️  ${secret} not found in .env file, skipping...`);
    }
  }

  console.log('\n✨ GitHub secrets have been set up!');
  console.log('\n⚠️  Make sure to:');
  console.log('1. Verify the secrets in your GitHub repository settings');
  console.log('2. Update your deployment workflow to use these secrets');
  
  rl.close();
}

// Run the setup
setupSecrets().catch(error => {
  console.error('Error setting up secrets:', error);
  process.exit(1);
}); 