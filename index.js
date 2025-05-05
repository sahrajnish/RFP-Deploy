import dotenv from "dotenv";
import express from "express";
import userRouter from "./routes/user.routes.js";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import { DB_NAME } from "./constanst.js";
import path, { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

dotenv.config({
    path: "./.env"
});

// Fix for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const port = process.env.PORT || 9000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from React app
const buildPath = path.resolve(__dirname, "./client/build");

if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(buildPath, "index.html"));
  });
} else {
  console.error("⚠️ client/build folder not found. Did you run npm run build?");
}

connectDB(`${process.env.MONGODB_URI}/${DB_NAME}`);
app.use("/api", userRouter);

app.listen(port, () => console.log(`Server running on ${port}`));
