import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import programRoutes from "./routes/program.routes.js";
import masterDataRoutes from "./routes/master-data.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import communicationRoutes from "./routes/communication.routes.js";
import contentRoutes from "./routes/content.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/master-data", masterDataRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/communication", communicationRoutes);
app.use("/api/content", contentRoutes);

export default app;