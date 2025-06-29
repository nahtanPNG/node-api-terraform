import { Router } from "express";
import { transactionController } from "../InMemoryContainer";

const router = Router();

router.post("/", (req, res) => transactionController.create(req, res));

router.get("/", (req, res) => transactionController.getAll(req, res));

router.get("/:id", (req, res) => transactionController.getById(req, res));

router.put("/:id", (req, res) => transactionController.update(req, res));

router.delete("/:id", (req, res) => transactionController.delete(req, res));

export { router as transactionRoutes };
