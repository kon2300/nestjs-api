export type LoginInputDto = {
  username: string;
  password: string;
};

export type LoginOutputDto = {
  accessToken: string;
  user: any;
};
