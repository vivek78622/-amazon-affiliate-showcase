import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  uptime: number;
  environment: 'development' | 'production' | 'test';
  services: {
    database: 'healthy' | 'unhealthy' | 'checking';
    api: 'healthy' | 'unhealthy' | 'checking';
  };
  error?: string;
  responseTime?: string;
}

export async function GET() {
  const startTime = Date.now();
  const health: HealthStatus = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV as 'development' | 'production' | 'test',
    services: {
      database: 'checking',
      api: 'healthy'
    }
  };

  try {
    // Check database connection
    await executeQuery('SELECT 1 as health_check');
    health.services.database = 'healthy';
  } catch (error) {
    health.status = 'degraded';
    health.services.database = 'unhealthy';
    health.error = error instanceof Error ? error.message : 'Unknown error';
  }

  const responseTime = Date.now() - startTime;
  health.responseTime = `${responseTime}ms`;

  return NextResponse.json(health, {
    status: health.status === 'healthy' ? 200 : 503,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'X-Response-Time': `${responseTime}ms`
    }
  });
} 