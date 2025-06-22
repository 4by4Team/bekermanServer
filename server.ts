import 'reflect-metadata';
import express from 'express';

import swaggerUi from 'swagger-ui-express';

import * as dotenv from 'dotenv';

dotenv.config();
import { AppDataSource } from './src/config/data-source';
import { swaggerSpec } from './src/swagger';

console.log(' Environment variables- server.ts',process.env.DB_HOST )

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log('🚀 Running at http://localhost:3000');
  console.log('📚 Swagger at http://localhost:3000/api-docs');
});

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log('✅ Database connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error during DB initialization:', err);
  });
