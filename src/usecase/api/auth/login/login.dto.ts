export type AuthLoginInputDto = {
  id: string;
  email: string;
  password: string;
};

export type AuthLoginOutputDto = {
  accessToken: string;
};
