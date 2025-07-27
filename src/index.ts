import express from "express";
import swaggerUi from "swagger-ui-express";
import categoryRoutes from "./routes/category.routes";
import articleRoutes from "./routes/article.routes";

import { errorHandler } from "./middlewares/errorHandler";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerOptions from "./config/swaggerOptions";
import test from "node:test";
import testimonyRoutes from "./routes/testimony.routes";
import courseRoutes from './routes/course.routes';
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import userRouters from "./routes/user.routes";
import applicantRoutes from "./routes/applicant.routes";

const app = express();
app.use(cors());

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use(express.json());

//routes

app.use('/api/categories', categoryRoutes);
app.use('/api/articles', articleRoutes);
app.use("/api/testimonies",testimonyRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRouters);
app.use('api/applicants',applicantRoutes);


// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.use(errorHandler);

export default app;
