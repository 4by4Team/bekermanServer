import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Bekerman and Melugma site',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.ts'], // תיעוד לswagger
};

export const swaggerSpec = swaggerJsdoc(options);
