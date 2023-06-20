export type FindByIdInputDto = {
  userId: string;
};

export type FindByIdOutputDto = {
  id: string;
  email: string;
  password: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;
} | null;
