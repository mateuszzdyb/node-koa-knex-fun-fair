import Router from '@koa/router';
import serverConfig from '../../../config/server';
import projectController from '../../../controllers/projectController';

const router = new Router({
  prefix: `${serverConfig.user}${serverConfig.userId}${serverConfig.projects}`,
});

router.get('/', projectController.getProjects);

router.get(serverConfig.projectId, projectController.getProjectById);

router.post(serverConfig.projectId, projectController.createDeployment);

export default router;
