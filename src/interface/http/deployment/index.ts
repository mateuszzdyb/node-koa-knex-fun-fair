import Router from '@koa/router';
import serverConfig from '../../../config/server';
import deploymentController from '../../../controllers/deploymentController';

const router = new Router({
  prefix: `${serverConfig.user}${serverConfig.userId}${serverConfig.projects}${serverConfig.projectId}${serverConfig.deployment}`,
});

router.get('/', deploymentController.getDeployments);

router.get(serverConfig.deploymentId, deploymentController.getDeploymentById);

router.put(serverConfig.deploymentId, deploymentController.putDeploymentById);

export default router;
