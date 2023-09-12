import { ParameterizedContext } from 'koa';

export async function verifyDeployment(ctx: ParameterizedContext, deploymentId: number) {
  const rep = await ctx.db.isDeploymentExist(deploymentId);
  return Number(rep?.count);
}

export async function verifyUser(ctx: ParameterizedContext, userId: number) {
  const rep = await ctx.db.isUserExist(userId);
  return Number(rep?.count);
}

export async function verifyProject(ctx: ParameterizedContext, projectId: number) {
  const rep = await ctx.db.isProjectExists(projectId);
  return Number(rep?.count);
}
