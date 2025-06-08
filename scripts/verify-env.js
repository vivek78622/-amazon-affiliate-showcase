const fs = require('fs');
const path = require('path');
require('dotenv').config();

const REQUIRED_ENV_VARS = {
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

function verifyEnvironment() {
  console.log('🔍 Verifying environment variables...\n');
  
  const missing = [];
  const present = [];
  
  for (const [key, description] of Object.entries(REQUIRED_ENV_VARS)) {
    if (!process.env[key]) {
      missing.push({ key, description });
    } else {
      // Mask sensitive values
      const value = key.toLowerCase().includes('key') || key.toLowerCase().includes('secret') 
        ? '********' 
        : process.env[key];
      present.push({ key, description, value });
    }
  }
  
  // Print results
  if (present.length > 0) {
    console.log('✅ Found environment variables:');
    present.forEach(({ key, description, value }) => {
      console.log(`   ${key}: ${value} (${description})`);
    });
    console.log('');
  }
  
  if (missing.length > 0) {
    console.log('❌ Missing environment variables:');
    missing.forEach(({ key, description }) => {
      console.log(`   ${key}: ${description}`);
    });
    console.log('\nPlease set these environment variables in your .env file and Vercel project.');
    process.exit(1);
  } else {
    console.log('✨ All required environment variables are set!');
  }
}

// Create .env.example if it doesn't exist
function createEnvExample() {
  const envExamplePath = path.join(__dirname, '../.env.example');
  if (!fs.existsSync(envExamplePath)) {
    const content = Object.keys(REQUIRED_ENV_VARS)
      .map(key => `${key}=`)
      .join('\n');
    
    fs.writeFileSync(envExamplePath, content);
    console.log('\n📝 Created .env.example file');
  }
}

// Main execution
try {
  verifyEnvironment();
  createEnvExample();
} catch (error) {
  console.error('Error verifying environment:', error);
  process.exit(1);
} 