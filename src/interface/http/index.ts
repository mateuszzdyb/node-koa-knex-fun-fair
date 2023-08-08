import Koa from 'koa';

import Router from '@koa/router';
import jwt from 'koa-jwt';
import koaBody from 'koa-body';

// ROUTES
import healthRouter from './health';
import projectRouter from './projects';
import userProjectRouter from './project';
import userProjectDeploymentRouter from './deployment';

export default async function httpLoader(): Promise<Koa> {
  const app = new Koa();
  const router = new Router();

  // simplified Authorization
  app.use(jwt({ secret: process.env.AUTH_TOKEN || '' }).unless({ path: [/^\/health/] }));

  app.use(koaBody());

  app.use(healthRouter.routes());
  app.use(projectRouter.routes());
  app.use(userProjectRouter.routes());
  app.use(userProjectDeploymentRouter.routes());
  app.use(router.routes());

  app.use(router.allowedMethods());

  return app;
}
