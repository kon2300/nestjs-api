export type AuthLoginInputDto = {
  email: string;
  password: string;
};

export type AuthLoginOutputDto = {
  accessToken: string;
};
