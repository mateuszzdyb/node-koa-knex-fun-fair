import { ParameterizedContext } from 'koa';

import validatePagination from '../utils/utils';

import { RESPONSE } from '../constants/response';

const getProjects = async (ctx: ParameterizedContext) => {
  const { page } = ctx.query;
  validatePagination(page);
  const offset = page ? Number(page) * 8 : 0;
  const limit = 8;
  ctx.body = ctx.db.getPaginatedProjects(offset, limit);
  ctx.status = RESPONSE.OK.STATUS;
};

const projectController = {
  getProjects,
};
export default projectController;
