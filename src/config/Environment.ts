export const Environments = {
  Development: "Development",
  Production: "Production",
};

export type Environment = (typeof Environments)[keyof typeof Environments];
