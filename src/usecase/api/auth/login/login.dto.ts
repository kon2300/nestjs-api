export type AuthLoginInputDto = {
  username: string;
  password: string;
};

export type AuthLoginOutputDto = {
  accessToken: string;
  user: any;
};
