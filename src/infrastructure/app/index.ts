import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { transactionRoutes } from "../routes/transactionRoutes";

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

app.use("/api/transactions", transactionRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint não encontrado",
  });
});

export { app };
