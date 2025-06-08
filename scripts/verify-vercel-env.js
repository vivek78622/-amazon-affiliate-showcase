const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const requiredEnvVars = [
  'DATABASE_URL',
  'DATABASE_URL_UNPOOLED',
  'POSTGRES_PRISMA_URL',
  'NEXT_PUBLIC_STACK_PROJECT_ID',
  'NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY',
  'STACK_SECRET_SERVER_KEY',
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

async function verifyVercelEnv() {
  console.log('🔍 Verifying Vercel environment variables...\n');

  try {
    // Check if Vercel CLI is installed
    try {
      execSync('vercel --version', { stdio: 'ignore' });
    } catch (error) {
      console.error('❌ Vercel CLI is not installed. Please install it first:');
      console.error('npm i -g vercel');
      process.exit(1);
    }

    // Get current environment variables from Vercel
    console.log('Fetching current environment variables from Vercel...');
    const envOutput = execSync('vercel env ls', { encoding: 'utf8' });
    
    // Parse environment variables
    const currentEnvVars = envOutput
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.split(' ')[0]);

    // Check for missing variables
    const missingVars = requiredEnvVars.filter(
      varName => !currentEnvVars.includes(varName)
    );

    if (missingVars.length > 0) {
      console.error('\n❌ Missing environment variables in Vercel:');
      missingVars.forEach(varName => console.error(`- ${varName}`));
      
      const shouldAdd = await askQuestion(
        '\nWould you like to add the missing variables now? (y/n): '
      );

      if (shouldAdd.toLowerCase() === 'y') {
        for (const varName of missingVars) {
          const value = await askQuestion(`Enter value for ${varName}: `);
          if (value) {
            try {
              execSync(`vercel env add ${varName}`, { stdio: 'inherit' });
              console.log(`✅ Added ${varName}`);
            } catch (error) {
              console.error(`❌ Failed to add ${varName}:`, error.message);
            }
          }
        }
      }
    } else {
      console.log('\n✅ All required environment variables are set in Vercel!');
    }

    // Verify production URL
    const productionUrl = 'https://amazon-affiliate-showcase-asjtslgur.vercel.app';
    console.log('\n🔗 Verifying production URL...');
    
    try {
      const response = await fetch(`${productionUrl}/api/health`);
      if (response.ok) {
        console.log('✅ Production URL is accessible and healthy!');
      } else {
        console.error('❌ Production URL returned an error status:', response.status);
      }
    } catch (error) {
      console.error('❌ Failed to access production URL:', error.message);
    }

  } catch (error) {
    console.error('Error verifying Vercel environment:', error);
    process.exit(1);
  }

  rl.close();
}

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Run the verification
verifyVercelEnv().catch(error => {
  console.error('Error:', error);
  process.exit(1);
}); 