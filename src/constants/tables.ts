export const DEPLOYMENT_STATUS = {
  PENDING: 'pending',
  BUILDING: 'building',
  DEPLOYING: 'deploying',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  DONE: 'done',
};

export const TABLE = {
  DEPLOYMENT: {
    NAME: 'deployment',
    COLUMN: {
      ID: 'id',
      STATUS: 'status',
      DEPLOYED_IN: 'deployed_in',
      CREATED_AT: 'created_at',
      PROJECT_ID: 'project_id',
    },
  },
  PROJECT: {
    NAME: 'project',
    COLUMN: {
      ID: 'id',
      URL: 'url',
      USER_ID: 'user_id',
    },
  },
  USERS: {
    NAME: 'users',
    COLUMN: {
      ID: 'id',
    },
  },
};
