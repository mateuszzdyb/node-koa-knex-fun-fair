import { ParameterizedContext } from 'koa';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

import eventManager from '../modules/events/EventManger';

import { verifyDeployment, verifyProject, verifyUser } from '../services/verifications';
import validatePagination from '../utils/utils';

import { RESPONSE } from '../constants/response';
import { DEPLOYMENT_STATUS } from '../constants/tables';

import { EventObj } from '../types/events-types';
import { KnexUpdateProjectDeploymentResponse } from '../types/knex-types';

const getDeployments = async (ctx: ParameterizedContext) => {
  const { page } = ctx.query;
  const { projectId, userId } = ctx.params;
  const verifiedUser = await verifyUser(ctx, userId);
  if (!verifiedUser) {
    ctx.body = { name: RESPONSE.NOT_FOUND.NAME, message: `user ${RESPONSE.NOT_FOUND.MESSAGE}` };
    ctx.status = RESPONSE.NOT_FOUND.STATUS;
    return;
  }
  const verifiedProject = await verifyProject(ctx, projectId);
  if (!verifiedProject) {
    ctx.body = {
      name: RESPONSE.NOT_FOUND.NAME,
      message: `project ${RESPONSE.NOT_FOUND.MESSAGE}`,
    };
    ctx.status = RESPONSE.NOT_FOUND.STATUS;
    return;
  }
  validatePagination(page);
  const offset = page ? Number(page) * 8 : 0;
  const limit = 8;
  ctx.body = ctx.db.getPaginatedDeploymentsByProjectId(projectId, offset, limit);
  ctx.status = RESPONSE.OK.STATUS;
};

const getDeploymentById = async (ctx: ParameterizedContext) => {
  const { deploymentId, projectId, userId } = ctx.params;
  const verifiedDeployment = await verifyDeployment(ctx, deploymentId);
  if (!verifiedDeployment) {
    ctx.body = {
      name: RESPONSE.NOT_FOUND.NAME,
      message: `deployment ${RESPONSE.NOT_FOUND.MESSAGE}`,
    };
    ctx.status = RESPONSE.NOT_FOUND.STATUS;
    return;
  }
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
  ctx.body = ctx.db.getPaginatedDeploymentById(deploymentId);
  ctx.status = RESPONSE.OK.STATUS;
};

const putDeploymentById = async (ctx: ParameterizedContext) => {
  const { projectId, userId, deploymentId } = ctx.params;
  const body = JSON.parse(ctx.request.body);
  const deploymentStatus = body?.status ? body.status : DEPLOYMENT_STATUS.CANCELLED;
  if (!Object.values(DEPLOYMENT_STATUS).includes(deploymentStatus)) {
    ctx.body = {
      name: RESPONSE.BAD_REQUEST.NAME,
      message: `${deploymentStatus}  ${RESPONSE.BAD_REQUEST.MESSAGE} .`,
    };
    ctx.status = RESPONSE.BAD_REQUEST.STATUS;
    return;
  }
  const verifiedUser = await verifyUser(ctx, userId);
  if (!verifiedUser) {
    ctx.body = { name: RESPONSE.NOT_FOUND.NAME, message: `user ${RESPONSE.NOT_FOUND.MESSAGE}` };
    ctx.status = RESPONSE.NOT_FOUND.STATUS;
    return;
  }
  const verifiedProject = await verifyProject(ctx, projectId);
  if (!verifiedProject) {
    ctx.body = {
      name: RESPONSE.NOT_FOUND.NAME,
      message: `project ${RESPONSE.NOT_FOUND.MESSAGE}`,
    };
    ctx.status = RESPONSE.NOT_FOUND.STATUS;
    return;
  }
  const verifiedDeployment = await verifyDeployment(ctx, deploymentId);
  if (!verifiedDeployment) {
    ctx.body = {
      name: RESPONSE.NOT_FOUND.NAME,
      message: `deployment ${RESPONSE.NOT_FOUND.MESSAGE}`,
    };
    ctx.status = RESPONSE.NOT_FOUND.STATUS;
    return;
  }

  if (deploymentStatus === DEPLOYMENT_STATUS.DONE) {
    const knexRes: KnexUpdateProjectDeploymentResponse = await ctx.db.updateDeploymentById(
      deploymentId
    );
    if (!knexRes.deployedIn) {
      const oldDate = moment.utc(knexRes.createdAt);
      const diff = Math.floor(moment.duration(moment().utc().diff(oldDate)).asSeconds());
      await ctx.db.updateDeployedInById(deploymentId, diff);
    }
    if (!knexRes.url) {
      const randomUrl = `http://random-link${uuidv4()}.com`;
      await ctx.db.updateUrlById(projectId, randomUrl);
    }
  }
  const resp = await ctx.db.updateDeploymentStatusById(deploymentId, deploymentStatus);

  const eventObj: EventObj = {
    deploymentId,
    projectId,
    userId,
    status: deploymentStatus,
  };

  eventManager.send(eventObj);
  ctx.body = resp;
  ctx.status = RESPONSE.OK.STATUS;
};

const deploymentController = {
  getDeployments,
  getDeploymentById,
  putDeploymentById,
};
export default deploymentController;
