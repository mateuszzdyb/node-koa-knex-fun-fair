enum DeploymentStatus {
  pending = 'pending',
  building = 'building',
  deploying = 'deploying',
  failed = 'failed',
  cancelled = 'cancelled',
  // eslint-disable-next-line prettier/prettier
  done = 'done'
}

export default DeploymentStatus;
