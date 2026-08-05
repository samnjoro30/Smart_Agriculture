import express from "express";
import cors from "cors";

import healthModule from "./modules/health/index.js";
import communityModule from "./modules/community/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthModule);
app.use("/api/community", communityModule);

export default app;