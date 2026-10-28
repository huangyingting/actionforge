import type { NextConfig } from 'next';

const basePath =
  process.env.BASE_PATH?.replace(/\/$/, '') ??
  (process.env.NODE_ENV === 'development' ? '' : '/actionforge');
if (basePath && !/^\/[\w/-]+$/.test(basePath))
  throw new Error('BASE_PATH must be a site-relative path.');

const config: NextConfig = {
  output: 'export',
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  basePath,
  images: { unoptimized: true },
  poweredByHeader: false,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  reactStrictMode: false,
  webpack(config) {
    config.output.environment = { ...config.output.environment, asyncFunction: true };
    config.module.rules.push({
      test: /src[\\/]engine[\\/].*\.js$/,
      type: 'javascript/auto',
    });
    return config;
  },
};

export default config;
