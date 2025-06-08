const { exec } = require('child_process');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

const prisma = new PrismaClient();
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BACKUP_DIR = path.join(__dirname, '../backups');
const DATE = new Date().toISOString().split('T')[0];

async function backupDatabase() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `db-backup-${timestamp}.sql`;
  const filepath = path.join(BACKUP_DIR, filename);

  // Ensure backup directory exists
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }

  // Create database backup using pg_dump
  const command = `pg_dump "${process.env.DATABASE_URL}" > "${filepath}"`;
  
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Database backup failed: ${error}`);
        reject(error);
        return;
      }
      console.log(`Database backup created: ${filepath}`);
      resolve(filepath);
    });
  });
}

async function backupUploads() {
  const uploadsDir = path.join(__dirname, '../public/uploads');
  if (!fs.existsSync(uploadsDir)) {
    console.log('No uploads directory found');
    return null;
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `uploads-backup-${timestamp}.zip`;
  const filepath = path.join(BACKUP_DIR, filename);

  // Create zip archive of uploads
  const command = `zip -r "${filepath}" "${uploadsDir}"`;
  
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Uploads backup failed: ${error}`);
        reject(error);
        return;
      }
      console.log(`Uploads backup created: ${filepath}`);
      resolve(filepath);
    });
  });
}

async function uploadToS3(filepath, type) {
  const fileContent = fs.readFileSync(filepath);
  const key = `backups/${type}/${path.basename(filepath)}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BACKUP_BUCKET,
    Key: key,
    Body: fileContent,
  });

  try {
    await s3Client.send(command);
    console.log(`Uploaded ${type} backup to S3: ${key}`);
    
    // Clean up local backup file
    fs.unlinkSync(filepath);
    console.log(`Cleaned up local backup file: ${filepath}`);
  } catch (error) {
    console.error(`Failed to upload to S3: ${error}`);
    throw error;
  }
}

async function cleanupOldBackups() {
  // Keep only the last 7 days of backups
  const files = fs.readdirSync(BACKUP_DIR);
  const now = new Date();
  
  for (const file of files) {
    const filepath = path.join(BACKUP_DIR, file);
    const stats = fs.statSync(filepath);
    const daysOld = (now - stats.mtime) / (1000 * 60 * 60 * 24);
    
    if (daysOld > 7) {
      fs.unlinkSync(filepath);
      console.log(`Deleted old backup: ${file}`);
    }
  }
}

async function main() {
  try {
    console.log('Starting backup process...');
    
    // Create backups
    const dbBackupPath = await backupDatabase();
    const uploadsBackupPath = await backupUploads();
    
    // Upload to S3
    await uploadToS3(dbBackupPath, 'database');
    if (uploadsBackupPath) {
      await uploadToS3(uploadsBackupPath, 'uploads');
    }
    
    // Cleanup old backups
    await cleanupOldBackups();
    
    console.log('Backup process completed successfully');
  } catch (error) {
    console.error('Backup process failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run backup if this script is executed directly
if (require.main === module) {
  main();
}

module.exports = { main }; 