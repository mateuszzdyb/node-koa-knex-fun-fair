import { ParameterizedContext } from 'koa';
import Router from '@koa/router';
import serverConfig from '../../config/server';
import { RESPONSE } from '../../constants/response';
import validatePagination from '../../utils/utils';
import psqlStore from '../../services/psqlStore';

const router = new Router({ prefix: serverConfig.projects });

router.get('/', async (ctx: ParameterizedContext) => {
  const { page } = ctx.query;
  validatePagination(page);
  const offset = page ? Number(page) * 8 : 0;
  const limit = 8;
  ctx.body = await psqlStore.getPaginatedProjects(offset, limit);
  ctx.status = RESPONSE.OK.STATUS;
});

export default router;
