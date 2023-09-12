import { DeploymentRow } from '../../types/knex-types';
import DeploymentStatus from '../../types/deployment-types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Dict<T = any> = { [k: string]: T };

export interface Store {
  createDeployment: (data: DeploymentRow) => Promise<Partial<DeploymentRow>[]>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPaginatedDeploymentById: (deploymentId: number) => Promise<any>;

  getPaginatedDeploymentsByProjectId: (
    projectId: number,
    offset: number,
    limit: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<any>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPaginatedProjects: (offset: number, limit: number) => Promise<any>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPaginatedProjectsByUserId: (userId: number, offset: number, limit: number) => Promise<any>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getProjectById: (projectId: number) => Promise<any>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getProjectUrlById: (projectId: number) => Promise<any[]>;

  isDeploymentExist: (deploymentId: number) => Promise<Dict<string | number> | undefined>;

  isProjectExists: (projectId: number) => Promise<Dict<string | number> | undefined>;

  isUserExist: (userId: number) => Promise<Dict<string | number> | undefined>;

  updateDeployedInById: (deploymentId: number, diff: number) => Promise<number>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateDeploymentById: (deploymentId: number) => Promise<any>;

  updateDeploymentStatusById: (
    deploymentId: number,
    deploymentStatus: DeploymentStatus
  ) => Promise<Partial<DeploymentRow>[]>;

  updateUrlById: (projectId: number, url: string) => void;
}
