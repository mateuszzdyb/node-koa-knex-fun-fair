import Router from '@koa/router';
import serverConfig from '../../config/server';

import projectsController from '../../controllers/projectsController';

const router = new Router({ prefix: serverConfig.projects });

router.get('/', projectsController.getProjects);

export default router;
