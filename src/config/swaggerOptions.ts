import { Options } from 'swagger-jsdoc';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bekerman API',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/**/*.ts'], 
};

export default options;
