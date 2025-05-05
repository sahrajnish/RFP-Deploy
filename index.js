import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import userRouter from "./routes/user.routes.js";
import connectDB from "./config/connectDB.js";
import { DB_NAME } from "./constanst.js";

// Get __dirname in ES module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to DB
connectDB(`${process.env.MONGODB_URI}/${DB_NAME}`);

// API Routes
app.use("/api", userRouter);

// Serve frontend (client/build)
const buildPath = path.resolve(__dirname, "./client/build");

if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(buildPath, "index.html"));
  });
} else {
  console.warn("client/build folder not found. If deploying, ensure you ran `npm run build` in /client.");
}

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});