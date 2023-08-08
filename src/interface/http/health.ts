import { ParameterizedContext } from 'koa';
import Router from '@koa/router';
import serverConfig from '../../config/server';
import { RESPONSE } from '../../constants/response';

const router = new Router({ prefix: serverConfig.healthCheck });

router.get('/', (ctx: ParameterizedContext) => {
  ctx.status = RESPONSE.OK.STATUS;
});

export default router;
