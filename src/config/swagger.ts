import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Sistema Logístico',
      version: '1.0.0',
      description: 'Documentación de la API del sistema logístico',
    },
    servers: [
      {
        url: 'http://localhost:3000/api', // cambia si estás desplegado
      },
    ],
  },
  apis: ['src/routes/*.ts'], // o donde estén tus rutas
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
