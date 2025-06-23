import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import testimonyRoutes from "./routes/testimony.routes";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// כאן תוכלי להוסיף את הראוטים שלך, למשל:
// import courseRoutes from './routes/course.routes'
// app.use('/api/courses', courseRoutes)
app.use("/testimonies", testimonyRoutes);

export default app;
