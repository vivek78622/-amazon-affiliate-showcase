const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const REQUIRED_SECRETS = {
  // Vercel
  VERCEL_TOKEN: 'Vercel deployment token',
  VERCEL_ORG_ID: 'Vercel organization ID',
  VERCEL_PROJECT_ID: 'Vercel project ID',
  
  // Database
  DATABASE_URL: 'PostgreSQL database URL',
  
  // Authentication
  NEXTAUTH_SECRET: 'NextAuth secret key',
  NEXTAUTH_URL: 'NextAuth URL',
  
  // Email
  RESEND_API_KEY: 'Resend API key for emails',
  
  // AWS
  AWS_ACCESS_KEY_ID: 'AWS access key for backups',
  AWS_SECRET_ACCESS_KEY: 'AWS secret key for backups',
  AWS_BACKUP_BUCKET: 'AWS S3 bucket for backups',
  AWS_REGION: 'AWS region',
  
  // App
  NEXT_PUBLIC_APP_URL: 'Public URL of the application',
  
  // Monitoring
  SENTRY_DSN: 'Sentry DSN for error tracking'
};

function getGitHubRepo() {
  try {
    const remoteUrl = execSync('git config --get remote.origin.url').toString().trim();
    const match = remoteUrl.match(/github\.com[:/]([^/]+)\/([^/]+)(?:\.git)?$/);
    if (!match) {
      throw new Error('Could not determine GitHub repository');
    }
    return {
      owner: match[1],
      repo: match[2].replace('.git', '')
    };
  } catch (error) {
    console.error('Error getting GitHub repository:', error.message);
    process.exit(1);
  }
}

function checkGitHubCLI() {
  try {
    execSync('gh --version');
  } catch (error) {
    console.error('GitHub CLI (gh) is not installed. Please install it first:');
    console.error('https://cli.github.com/');
    process.exit(1);
  }
}

function checkGitHubAuth() {
  try {
    execSync('gh auth status');
  } catch (error) {
    console.error('Not authenticated with GitHub CLI. Please run:');
    console.error('gh auth login');
    process.exit(1);
  }
}

async function setupSecrets() {
  console.log('🔧 Setting up GitHub repository secrets...\n');
  
  // Check prerequisites
  checkGitHubCLI();
  checkGitHubAuth();
  
  const { owner, repo } = getGitHubRepo();
  console.log(`Repository: ${owner}/${repo}\n`);
  
  // Verify environment variables
  const missing = [];
  for (const [key, description] of Object.entries(REQUIRED_SECRETS)) {
    if (!process.env[key]) {
      missing.push({ key, description });
    }
  }
  
  if (missing.length > 0) {
    console.log('❌ Missing environment variables:');
    missing.forEach(({ key, description }) => {
      console.log(`   ${key}: ${description}`);
    });
    console.log('\nPlease set these environment variables in your .env file first.');
    process.exit(1);
  }
  
  // Set secrets
  console.log('Setting up secrets...\n');
  for (const [key, description] of Object.entries(REQUIRED_SECRETS)) {
    try {
      const value = process.env[key];
      execSync(`gh secret set ${key} -b"${value}" -R ${owner}/${repo}`, { stdio: 'ignore' });
      console.log(`✅ Set ${key} (${description})`);
    } catch (error) {
      console.error(`❌ Failed to set ${key}: ${error.message}`);
    }
  }
  
  console.log('\n✨ GitHub secrets setup complete!');
}

// Main execution
setupSecrets().catch(error => {
  console.error('Error setting up GitHub secrets:', error);
  process.exit(1);
}); 