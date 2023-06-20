export type UserProfileInputDto = {
  userId: string;
};

export type UserProfileOutputDto = {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  file: string | null;
};
