import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import directoryRoutes from "./routes/directoryRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { checkAuth } from "./middlewares/authMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";

const secretKey = process.env.SESSION_SECRET;
await connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser(secretKey));
//Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/directory", checkAuth, directoryRoutes);
app.use("/file", checkAuth, fileRoutes);
app.use("/", userRoutes);
app.use("/auth", authRoutes);

app.use((err, req, res, next) => {
  console.log("Error:", err);
  res
    .status(err.status || 500)
    .json({ success: false, message: "Something went wrong!" });
});

app.listen(4000, () => {
  console.log(`Storage app listening on port 4000`);
});
