import DeploymentType from './deployment-types';

export type EventObj = {
  projectId: number;
  userId: number;
  deploymentId: number;
  status: DeploymentType;
  date?: Date;
};
