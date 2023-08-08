export default {
  hostname: process.env.HOSTNAME || 'localhost',
  port: Number.parseInt(process.env.SERVER_PORT || '3000', 10),
  deployment: process.env.DEPLOYMENT_PATH || '/deployment',
  deploymentId: process.env.DEPLOYMENT__ID_PATH || '/:deploymentId',
  healthCheck: process.env.HEALTH_CHECK_PATH || '/health',
  user: process.env.USER_PATH || '/user',
  userId: process.env.USER_ID_PATH || '/:userId',
  projects: process.env.PROJECT_PATH || '/project',
  projectId: process.env.PROJECT_ID_PATH || '/:projectId',
};
