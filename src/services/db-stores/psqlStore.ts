import knex from '../../infrastructure/database';
import { TABLE } from '../../constants/tables';
import DeploymentStatus from '../../types/deployment-types';
import { DeploymentRow } from '../../types/knex-types';
import { Store } from './storeInterface';

class PsqlStore implements Store {
  createDeployment = async (data: DeploymentRow) =>
    knex<DeploymentRow>(TABLE.DEPLOYMENT.NAME)
      .insert(data)
      .returning([
        TABLE.DEPLOYMENT.COLUMN.ID,
        TABLE.DEPLOYMENT.COLUMN.STATUS,
        TABLE.DEPLOYMENT.COLUMN.DEPLOYED_IN,
        TABLE.DEPLOYMENT.COLUMN.CREATED_AT,
      ]);

  getPaginatedDeploymentById = async (deploymentId: number) =>
    knex
      .select(
        TABLE.DEPLOYMENT.COLUMN.ID,
        TABLE.DEPLOYMENT.COLUMN.DEPLOYED_IN,
        TABLE.DEPLOYMENT.COLUMN.STATUS,
        TABLE.DEPLOYMENT.COLUMN.CREATED_AT
      )
      .from(TABLE.DEPLOYMENT.NAME)
      .where(TABLE.DEPLOYMENT.COLUMN.ID, deploymentId);

  getPaginatedDeploymentsByProjectId = async (projectId: number, offset: number, limit: number) =>
    knex
      .select()
      .from(TABLE.DEPLOYMENT.NAME)
      .where(TABLE.DEPLOYMENT.COLUMN.PROJECT_ID, projectId)
      .offset(offset)
      .limit(limit);

  getPaginatedProjects = async (offset: number, limit: number) =>
    knex()
      .select(
        knex.raw(
          `    project.id, project.name, project.url, 
          CASE 
                WHEN (SELECT COUNT(*) AS h_l_d FROM deployment WHERE  deployment.status='done' AND project.id=deployment.project_id ) > 0 THEN true
                ELSE false
          END AS has_live_deployment, 
          CASE 
                WHEN (SELECT COUNT(*) AS h_p_d FROM deployment WHERE project.id=deployment.project_id AND (deployment.status = 'pending' OR 
              deployment.status = 'building' OR
              deployment.status = 'deploying' )) > 0 THEN true
                ELSE false
          END AS has_pending_deployment`
        )
      )
      .fromRaw('project, deployment')
      .groupBy('project.id')
      .offset(offset)
      .limit(limit);

  getPaginatedProjectsByUserId = async (userId: number, offset: number, limit: number) =>
    knex
      .select()
      .from(TABLE.PROJECT.NAME)
      .where(TABLE.PROJECT.COLUMN.USER_ID, userId)
      .offset(offset)
      .limit(limit);

  getProjectById = async (projectId: number) =>
    knex
      .select(
        knex.raw(
          `    project.id, project.name, project.url, 
                CASE 
                      WHEN (SELECT COUNT(*) AS h_l_d FROM deployment WHERE  deployment.status='done' AND project.id=deployment.project_id ) > 0 THEN true
                      ELSE false
                END AS has_live_deployment, 
                CASE 
                      WHEN (SELECT COUNT(*) AS h_p_d FROM deployment WHERE project.id=deployment.project_id AND (deployment.status = 'pending' OR 
                    deployment.status = 'building' OR
                    deployment.status = 'deploying' )) > 0 THEN true
                      ELSE false
                END AS has_pending_deployment`
        )
      )
      .fromRaw('project, deployment')
      .groupBy('project.id', 'deployment.status')
      .where('project.id', projectId)
      .first();

  getProjectUrlById = async (projectId: number) =>
    knex(TABLE.PROJECT.NAME)
      .select(TABLE.PROJECT.COLUMN.URL)
      .where(TABLE.PROJECT.COLUMN.ID, projectId);

  isDeploymentExist = async (deploymentId: number) =>
    knex
      .select()
      .count()
      .from(TABLE.DEPLOYMENT.NAME)
      .where(TABLE.DEPLOYMENT.COLUMN.ID, deploymentId)
      .first();

  isProjectExists = async (projectId: number) =>
    knex
      .select()
      .count()
      .from(TABLE.PROJECT.NAME)
      .where(TABLE.PROJECT.COLUMN.ID, projectId)
      .first();

  isUserExist = async (userId: number) =>
    knex.select().count().from(TABLE.USERS.NAME).where(TABLE.USERS.COLUMN.ID, userId).first();

  updateDeployedInById = async (deploymentId: number, diff: number) =>
    knex(TABLE.DEPLOYMENT.NAME)
      .update(TABLE.DEPLOYMENT.COLUMN.DEPLOYED_IN, diff)
      .where(TABLE.DEPLOYMENT.COLUMN.ID, deploymentId);

  updateDeploymentById = async (deploymentId: number) =>
    knex(TABLE.PROJECT.NAME)
      .join(TABLE.DEPLOYMENT.NAME, TABLE.DEPLOYMENT.COLUMN.PROJECT_ID, '=', TABLE.PROJECT.COLUMN.ID)
      .select(
        TABLE.PROJECT.COLUMN.URL,
        TABLE.DEPLOYMENT.COLUMN.CREATED_AT,
        TABLE.DEPLOYMENT.COLUMN.DEPLOYED_IN
      )
      .where(TABLE.DEPLOYMENT.COLUMN.ID, deploymentId)
      .first();

  updateDeploymentStatusById = async (deploymentId: number, deploymentStatus: DeploymentStatus) =>
    knex<DeploymentRow>(TABLE.DEPLOYMENT.NAME)
      .update({ status: deploymentStatus })
      .where(TABLE.DEPLOYMENT.COLUMN.ID, deploymentId)
      .returning([
        TABLE.DEPLOYMENT.COLUMN.ID,
        TABLE.DEPLOYMENT.COLUMN.STATUS,
        TABLE.DEPLOYMENT.COLUMN.DEPLOYED_IN,
        TABLE.DEPLOYMENT.COLUMN.CREATED_AT,
      ]);

  updateUrlById = (projectId: number, url: string) =>
    knex(TABLE.PROJECT.NAME)
      .update(TABLE.PROJECT.COLUMN.URL, url)
      .where(TABLE.PROJECT.COLUMN.ID, projectId);
}

export = PsqlStore;
