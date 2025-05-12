import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createServer } from "http";
import { Server as IOServer } from "socket.io";
import { setupSocket } from './config/socket';
import { connectDB } from "./config/db";
import authRoutes from './routes/auth.routes';
import productRoute from './routes/product.routes';
import inventoryRoute from './routes/inventory.routes';
import { authenticateToken } from "./middleware/auth.middleware";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from 'cors';
import next from 'next';
import path from "path";

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, dir: './client' });
const handle = nextApp.getRequestHandler();
const app = express();
const httpServer = createServer(app);

const allowedOrigins = [
  "http://localhost:9000",
  "https://marapesa.com",
  "https://smartshop-api.marapesa.com",
  "http://185.113.249.137:3000",
  "https://api.marapesa.com"
];

const io = new IOServer(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
  }
});

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = Number(process.env.PORT) || 5000;

nextApp.prepare().then(() => {
  connectDB();

  app.use("/api/auth", authRoutes);
  app.use("/api/products", authenticateToken, productRoute);
  app.use("/api/inventory", authenticateToken, inventoryRoute);

  app.all('*', (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });

  setupSocket(io);
});
