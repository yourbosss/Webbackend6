import { createProxyMiddleware } from 'http-proxy-middleware';

export const userProxy = createProxyMiddleware({
  target: 'http://localhost:3001', // User Service
  changeOrigin: true,
  pathRewrite: { '^/api/users': '' },
});

export const courseProxy = createProxyMiddleware({
  target: 'http://localhost:3002', // Course Service
  changeOrigin: true,
  pathRewrite: { '^/api/courses': '' },
});

export const registrationProxy = createProxyMiddleware({
  target: 'http://localhost:3003', // Registration Service
  changeOrigin: true,
  pathRewrite: { '^/api/registration': '' },
});
