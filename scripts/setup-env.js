const fs = require('fs');
const path = require('path');
const readline = require('readline');
const crypto = require('crypto');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const questions = [
  {
    key: 'DATABASE_URL',
    question: 'Enter your Neon database URL (pooled): ',
    validate: (value) => value.includes('neon.tech') && value.includes('pooler'),
    error: 'Invalid Neon database URL. Must be a pooled connection URL from Neon.',
    default: 'postgres://neondb_owner:npg_HJEmcUxKMj48@ep-withered-resonance-a42b6evx-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require'
  },
  {
    key: 'DATABASE_URL_UNPOOLED',
    question: 'Enter your Neon database URL (unpooled): ',
    validate: (value) => value.includes('neon.tech') && !value.includes('pooler'),
    error: 'Invalid Neon database URL. Must be an unpooled connection URL from Neon.',
    default: 'postgresql://neondb_owner:npg_HJEmcUxKMj48@ep-withered-resonance-a42b6evx.us-east-1.aws.neon.tech/neondb?sslmode=require'
  },
  {
    key: 'POSTGRES_PRISMA_URL',
    question: 'Enter your Prisma-specific database URL: ',
    validate: (value) => value.includes('neon.tech') && value.includes('connect_timeout'),
    error: 'Invalid Prisma database URL. Must include connect_timeout parameter.',
    default: 'postgres://neondb_owner:npg_HJEmcUxKMj48@ep-withered-resonance-a42b6evx-pooler.us-east-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require'
  },
  {
    key: 'NEXT_PUBLIC_STACK_PROJECT_ID',
    question: 'Enter your Neon project ID: ',
    validate: (value) => value.length > 0,
    error: 'Project ID is required',
    default: 'a8f7d5e7-2a0d-49c1-ac27-67b69ec77ab6'
  },
  {
    key: 'NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY',
    question: 'Enter your Neon publishable client key: ',
    validate: (value) => value.startsWith('pck_'),
    error: 'Invalid publishable client key. Must start with pck_',
    default: 'pck_1449h3wby6fe67507p5j5nd2ky3fgj9ef4ppx04pczh4g'
  },
  {
    key: 'STACK_SECRET_SERVER_KEY',
    question: 'Enter your Neon secret server key: ',
    validate: (value) => value.startsWith('ssk_'),
    error: 'Invalid secret server key. Must start with ssk_',
    default: 'ssk_1mjvs84cvjj5030f59164h6vvky4p3akxmxzwg54d5th0'
  },
  {
    key: 'NEXTAUTH_SECRET',
    question: 'Generate a random secret for NextAuth? (y/n): ',
    generate: () => crypto.randomBytes(32).toString('hex'),
    validate: (value) => value === 'y' || value === 'n',
    error: 'Please answer with y or n'
  },
  {
    key: 'NEXTAUTH_URL',
    question: 'Enter your application URL (default: http://localhost:3000): ',
    default: 'http://localhost:3000',
    validate: (value) => value.startsWith('http://') || value.startsWith('https://'),
    error: 'Invalid URL. Must start with http:// or https://'
  },
  {
    key: 'RESEND_API_KEY',
    question: 'Enter your Resend API key (get it from https://resend.com): ',
    validate: (value) => value.length > 0,
    error: 'API key is required'
  },
  {
    key: 'AWS_ACCESS_KEY_ID',
    question: 'Enter your AWS Access Key ID: ',
    validate: (value) => value.length > 0,
    error: 'AWS Access Key ID is required'
  },
  {
    key: 'AWS_SECRET_ACCESS_KEY',
    question: 'Enter your AWS Secret Access Key: ',
    validate: (value) => value.length > 0,
    error: 'AWS Secret Access Key is required'
  },
  {
    key: 'AWS_BACKUP_BUCKET',
    question: 'Enter your AWS S3 bucket name for backups: ',
    validate: (value) => value.length > 0,
    error: 'Bucket name is required'
  },
  {
    key: 'AWS_REGION',
    question: 'Enter your AWS region (e.g., us-east-1): ',
    validate: (value) => value.length > 0,
    error: 'AWS region is required'
  },
  {
    key: 'NEXT_PUBLIC_APP_URL',
    question: 'Enter your public application URL (default: http://localhost:3000): ',
    default: 'http://localhost:3000',
    validate: (value) => value.startsWith('http://') || value.startsWith('https://'),
    error: 'Invalid URL. Must start with http:// or https://'
  },
  {
    key: 'SENTRY_DSN',
    question: 'Enter your Sentry DSN (optional, press Enter to skip): ',
    validate: (value) => value === '' || value.startsWith('https://'),
    error: 'Invalid Sentry DSN. Must start with https:// or be empty'
  }
];

async function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question.question, (answer) => {
      if (question.validate && !question.validate(answer)) {
        console.error(question.error);
        return askQuestion(question).then(resolve);
      }
      
      if (question.generate && answer === 'y') {
        answer = question.generate();
        console.log(`Generated value: ${answer}`);
      }
      
      if (!answer && question.default) {
        answer = question.default;
        console.log(`Using default value: ${answer}`);
      }
      
      resolve(answer);
    });
  });
}

async function setupEnvironment() {
  console.log('🔧 Setting up environment variables...\n');
  
  const envVars = {};
  
  for (const question of questions) {
    const answer = await askQuestion(question);
    if (answer) {
      envVars[question.key] = answer;
    }
  }
  
  // Create .env file
  const envContent = Object.entries(envVars)
    .map(([key, value]) => `${key}="${value}"`)
    .join('\n');
  
  const envPath = path.join(__dirname, '../.env');
  fs.writeFileSync(envPath, envContent);
  
  // Create .env.example without sensitive values
  const exampleContent = Object.entries(envVars)
    .map(([key, value]) => {
      if (key.includes('SECRET') || key.includes('KEY') || key.includes('PASSWORD')) {
        return `${key}="your-${key.toLowerCase().replace(/_/g, '-')}"`;
      }
      return `${key}="${value}"`;
    })
    .join('\n');
  
  const examplePath = path.join(__dirname, '../.env.example');
  fs.writeFileSync(examplePath, exampleContent);
  
  console.log('\n✨ Environment variables have been set up!');
  console.log('📝 Created .env and .env.example files');
  console.log('\n⚠️  Make sure to:');
  console.log('1. Add .env to your .gitignore file');
  console.log('2. Keep your .env file secure');
  console.log('3. Share the .env.example file with your team');
  
  rl.close();
}

// Run the setup
setupEnvironment().catch(error => {
  console.error('Error setting up environment:', error);
  process.exit(1);
}); 