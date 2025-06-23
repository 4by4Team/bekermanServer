import express from "express";

import testimonyRoutes from "./routes/testimony.routes";

const app = express();

app.use(express.json());


// כאן תוכלי להוסיף את הראוטים שלך, למשל:
// import courseRoutes from './routes/course.routes'
// app.use('/api/courses', courseRoutes)
app.use("/testimonies", testimonyRoutes);

export default app;
