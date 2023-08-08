module.exports = {
  displayName: 'Node Knex Funafair',
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  rootDir: __dirname,
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  testTimeout: 5000,
};

process.env = Object.assign(process.env, {
  SERVER_PORT: 3000,
  HOSTNAME: 'psql',
  DB_HOST: 'localhost',
  DB_PORT: 5432,
  DB_DATABASE: 'password_sand',
  DB_USERNAME: 'password_sand',
  DB_PASSWORD: 'password_sand',
  AUTH_TOKEN: '14e02858-37c2-11ee-be56-0242ac120002',
  DEPLOYMENT_PATH: '/deployment',
  DEPLOYMENT__ID_PATH: '/:deploymentId',
  HEALTH_CHECK_PATH: '/health',
  USER_PATH: '/user',
  PROJECT_PATH: '/project',
  PROJECT_ID_PATH: '/:projectId',
  USER_ID_PATH: '/:userId',
});
