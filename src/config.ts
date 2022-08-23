export default {
  environment: process.env.NODE_ENV,
  logoImagesDir: 'https://assignment-fe.s3.eu-central-1.amazonaws.com/logo/',
  backgroundDir:
    'https://assignment-fe.s3.eu-central-1.amazonaws.com/background/',
}

export enum Environment {
  production = 'production',
}
