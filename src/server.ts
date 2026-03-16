import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createServer } from "http";
import { Server as IOServer } from "socket.io";
import { setupSocket } from './config/socket';
import { connectDB } from "./config/db";
import authRoutes from './routes/auth.routes';
import productRoute from './routes/product.routes';
import salesRoute from './routes/sales.route';
import categoryRoute from './routes/categories.routes';
import businessRoute from './routes/business.routes';
import inventoryLogsRoute from './routes/inventoryLogs.routes';
import PaymentRoute from './routes/payments.route'
import RefundRoute from './routes/refunds.route'
import RefundItemRoute from './routes/refundItems.route'
import SaleItemRoute from './routes/saleItems.route'
import CashRoute from './routes/cashierRegistrations.route'
import { authenticateToken } from "./middleware/auth.middleware";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from 'cors';


const dev = process.env.NODE_ENV !== 'production';

const app = express();
const httpServer = createServer(app);

const allowedOrigins = [
  "http://localhost:9000",
  "https://marapesa.com",
  "https://smartshop-api.marapesa.com",
  "http://185.113.249.137:3000",
  "https://api.marapesa.com",
  "https://84b2-41-209-9-114.ngrok-free.app"
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

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/products", authenticateToken, productRoute);
app.use("/api/sales", authenticateToken, salesRoute);
app.use("/api/categories", authenticateToken, categoryRoute);
app.use("/api/business", authenticateToken, businessRoute);
app.use("/api/inventory-logs", authenticateToken, inventoryLogsRoute);
app.use("/api/cash-registrations", authenticateToken, CashRoute);
app.use("/api/payments", authenticateToken, PaymentRoute);
app.use("/api/refunds", authenticateToken, RefundRoute);
app.use("/api/refund-items", authenticateToken, RefundItemRoute);
app.use("/api/sales-items", authenticateToken, SaleItemRoute);
app.use('*', (req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

httpServer.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});

setupSocket(io);

