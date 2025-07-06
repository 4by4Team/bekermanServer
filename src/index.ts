import express from 'express'
import swaggerUi from 'swagger-ui-express'
import categoryRoutes from './routes/category.routes'
import articleRoutes from './routes/article.routes';

import { errorHandler } from './middlewares/errorHandler'
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './config/swaggerOptions';
import test from 'node:test';
import testimonyRoutes from './routes/testimony.routes';

const app = express()
const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use(express.json())

//routes
app.use('/api/categories', categoryRoutes);
app.use('/api/articles', articleRoutes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});


app.use(errorHandler);
app.use("/testimonies",testimonyRoutes);

export default app;
