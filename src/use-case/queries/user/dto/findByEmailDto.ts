export type FindByEmailInputDto = {
  email: string;
};

export type FindByEmailOutputDto = {
  id: string;
  email: string;
  password: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;
} | null;
