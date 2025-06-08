const { PrismaClient } = require('@prisma/client');
const Sentry = require('@sentry/nextjs');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const prisma = new PrismaClient();
const LOG_FILE = path.join(__dirname, '../logs/monitoring.log');

// Ensure logs directory exists
if (!fs.existsSync(path.dirname(LOG_FILE))) {
  fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
}

function log(message, level = 'INFO') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level}] ${message}\n`;
  fs.appendFileSync(LOG_FILE, logMessage);
  console.log(logMessage.trim());
}

async function checkDatabase() {
  try {
    const startTime = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    const responseTime = Date.now() - startTime;
    
    log(`Database health check: OK (${responseTime}ms)`);
    return true;
  } catch (error) {
    log(`Database health check failed: ${error.message}`, 'ERROR');
    Sentry.captureException(error);
    return false;
  }
}

async function checkApiEndpoints() {
  const endpoints = [
    '/api/health',
    '/api/products',
    '/api/categories',
    // Add more endpoints to monitor
  ];

  const results = await Promise.all(
    endpoints.map(async (endpoint) => {
      try {
        const startTime = Date.now();
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}${endpoint}`);
        const responseTime = Date.now() - startTime;
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        log(`API endpoint ${endpoint}: OK (${responseTime}ms)`);
        return { endpoint, status: 'OK', responseTime };
      } catch (error) {
        log(`API endpoint ${endpoint} failed: ${error.message}`, 'ERROR');
        Sentry.captureException(error);
        return { endpoint, status: 'ERROR', error: error.message };
      }
    })
  );

  return results;
}

async function checkDiskSpace() {
  try {
    const { exec } = require('child_process');
    const command = process.platform === 'win32' 
      ? 'wmic logicaldisk get size,freespace,caption'
      : 'df -h /';

    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        log(`Disk space check: ${stdout.trim()}`);
        resolve(stdout);
      });
    });
  } catch (error) {
    log(`Disk space check failed: ${error.message}`, 'ERROR');
    Sentry.captureException(error);
    return null;
  }
}

async function checkMemoryUsage() {
  const used = process.memoryUsage();
  const memoryInfo = {
    rss: `${Math.round(used.rss / 1024 / 1024)}MB`,
    heapTotal: `${Math.round(used.heapTotal / 1024 / 1024)}MB`,
    heapUsed: `${Math.round(used.heapUsed / 1024 / 1024)}MB`,
    external: `${Math.round(used.external / 1024 / 1024)}MB`,
  };
  
  log(`Memory usage: ${JSON.stringify(memoryInfo)}`);
  return memoryInfo;
}

async function checkErrorRates() {
  try {
    const lastHour = new Date(Date.now() - 60 * 60 * 1000);
    const errors = await prisma.errorLog.count({
      where: {
        timestamp: {
          gte: lastHour
        }
      }
    });
    
    log(`Error rate in last hour: ${errors} errors`);
    return errors;
  } catch (error) {
    log(`Error rate check failed: ${error.message}`, 'ERROR');
    Sentry.captureException(error);
    return null;
  }
}

async function checkActiveUsers() {
  try {
    const lastHour = new Date(Date.now() - 60 * 60 * 1000);
    const activeUsers = await prisma.userActivity.count({
      where: {
        lastActive: {
          gte: lastHour
        }
      }
    });
    
    log(`Active users in last hour: ${activeUsers}`);
    return activeUsers;
  } catch (error) {
    log(`Active users check failed: ${error.message}`, 'ERROR');
    Sentry.captureException(error);
    return null;
  }
}

async function main() {
  try {
    log('Starting monitoring checks...');
    
    const checks = await Promise.all([
      checkDatabase(),
      checkApiEndpoints(),
      checkDiskSpace(),
      checkMemoryUsage(),
      checkErrorRates(),
      checkActiveUsers()
    ]);
    
    const allChecksPassed = checks.every(check => check !== false && check !== null);
    
    if (!allChecksPassed) {
      log('Some monitoring checks failed', 'WARN');
      // You could add notification logic here (email, Slack, etc.)
    } else {
      log('All monitoring checks passed');
    }
  } catch (error) {
    log(`Monitoring failed: ${error.message}`, 'ERROR');
    Sentry.captureException(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run monitoring if this script is executed directly
if (require.main === module) {
  main();
}

module.exports = {
  main,
  checkDatabase,
  checkApiEndpoints,
  checkDiskSpace,
  checkMemoryUsage,
  checkErrorRates,
  checkActiveUsers
}; 