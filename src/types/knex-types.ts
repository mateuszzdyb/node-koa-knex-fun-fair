export type DeploymentRow = {
  status: string;
  deployed_in: number;
  project_id: number;
  created_at: string;
};

export type KnexUpdateProjectDeploymentResponse = {
  url: string | null;
  createdAt: string;
  deployedIn: number;
};
