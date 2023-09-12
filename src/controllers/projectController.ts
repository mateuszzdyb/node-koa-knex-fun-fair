import { ParameterizedContext } from 'koa';
import moment from 'moment';

import { verifyProject, verifyUser } from '../services/verifications';
import validatePagination from '../utils/utils';

import { RESPONSE } from '../constants/response';
import { DEPLOYMENT_STATUS } from '../constants/tables';

import { DeploymentRow } from '../types/knex-types';

const getProjects = async (ctx: ParameterizedContext) => {
  const { page } = ctx.query;
  const { userId } = ctx.params;
  validatePagination(page);
  const verifiedUser = await verifyUser(ctx, userId);
  if (!verifiedUser) {
    ctx.body = { name: RESPONSE.NOT_FOUND.NAME, message: `user ${RESPONSE.NOT_FOUND.MESSAGE}` };
    ctx.status = RESPONSE.NOT_FOUND.STATUS;
    return;
  }
  const offset = page ? Number(page) * 8 : 0;
  const limit = 8;
  ctx.body = ctx.db.getPaginatedProjectsByUserId(userId, offset, limit);
  ctx.status = RESPONSE.OK.STATUS;
};

const getProjectById = async (ctx: ParameterizedContext) => {
  const { projectId, userId } = ctx.params;
  const verifiedProject = await verifyProject(ctx, projectId);
  if (!verifiedProject) {
    ctx.body = {
      name: RESPONSE.NOT_FOUND.NAME,
      message: `project ${RESPONSE.NOT_FOUND.MESSAGE}`,
    };
    ctx.status = RESPONSE.NOT_FOUND.STATUS;
    return;
  }
  const verifiedUser = await verifyUser(ctx, userId);
  if (!verifiedUser) {
    ctx.body = { name: RESPONSE.NOT_FOUND.NAME, message: `user ${RESPONSE.NOT_FOUND.MESSAGE}` };
    ctx.status = RESPONSE.NOT_FOUND.STATUS;
    return;
  }

  ctx.body = ctx.db.getProjectById(projectId);
  ctx.status = RESPONSE.OK.STATUS;
};

const createDeployment = async (ctx: ParameterizedContext) => {
  const { projectId, userId } = ctx.params;
  const verifiedProject = await verifyProject(ctx, projectId);
  if (!verifiedProject) {
    ctx.body = {
      name: RESPONSE.NOT_FOUND.NAME,
      message: `project ${RESPONSE.NOT_FOUND.MESSAGE}`,
    };
    ctx.status = RESPONSE.NOT_FOUND.STATUS;
    return;
  }
  const verifiedUser = await verifyUser(ctx, userId);
  if (!verifiedUser) {
    ctx.body = { name: RESPONSE.NOT_FOUND.NAME, message: `user ${RESPONSE.NOT_FOUND.MESSAGE}` };
    ctx.status = RESPONSE.NOT_FOUND.STATUS;
    return;
  }
  const data: DeploymentRow = {
    project_id: projectId,
    status: DEPLOYMENT_STATUS.PENDING,
    deployed_in: 0,
    created_at: moment().utc().format(),
  };
  ctx.body = ctx.db.createDeployment(data);
  ctx.status = RESPONSE.CREATED.STATUS;
};

const projectController = {
  createDeployment,
  getProjects,
  getProjectById,
};
export default projectController;
