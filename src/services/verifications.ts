import psqlStore from './psqlStore';

export async function verifyDeployment(deploymentId: number) {
  const rep = await psqlStore.isDeploymentExist(deploymentId);
  return Number(rep?.count);
}

export async function verifyUser(userId: number) {
  const rep = await psqlStore.isUserExist(userId);
  return Number(rep?.count);
}

export async function verifyProject(projectId: number) {
  const rep = await psqlStore.isProjectExists(projectId);
  return Number(rep?.count);
}
