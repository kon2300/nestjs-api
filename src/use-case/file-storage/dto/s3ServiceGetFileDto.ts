export type S3ServiceGetFileInputDto = {
  filePath: string;
};

export type S3ServiceGetFileOutputDto = {
  file: string | null;
};
