export type S3ServiceUploadFileInputDto = {
  file: Express.Multer.File;
};

export type s3ServiceUploadFileOutputDto = {
  filePath: string | null;
};
