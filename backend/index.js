import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

import connectDB from "./config/db.js";

import projectRoutes from "./routes/projectRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import visitRoutes from "./routes/visitRoutes.js";

dotenv.config();
connectDB();

const app = express();

// CORS
app.use(cors({
  origin: "*", // Update with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
 
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use("/chat", chatLimiter);

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
});
app.use("/contact", contactLimiter);

// Routes
app.use("/projects", projectRoutes);
app.use("/contact", contactRoutes);
app.use("/chat", chatRoutes);
app.use("/visit", visitRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("API Running ");
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({ error: "Something went wrong" });
});

export default app;
