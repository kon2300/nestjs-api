export type s3ServiceUploadFileInputDto = {
  file: Express.Multer.File;
};

export type s3ServiceUploadFileOutputDto = {
  eTag: string | null;
};
