import { Request, Response } from "express";
import { CreateTransaction } from "../../use-cases/CreateTransaction";
import { z } from "zod";
import { GetAllTransactions } from "../../use-cases/GetAllTransactions";
import { GetTransactionById } from "../../use-cases/GetTransactionById";
import { UpdateTransaction } from "../../use-cases/UpdateTransaction";
import { DeleteTransaction } from "../../use-cases/DeleteTransaction";

const CreateTransactionSchema = z.object({
  amount: z.number(),
  description: z.string(),
  type: z.enum(["income", "expense"]),
});

const UpdateTransactionSchema = z.object({
  amount: z.number().optional(),
  description: z.string().optional(),
  type: z.enum(["income", "expense"]).optional(),
});

export class TransactionController {
  constructor(
    private createTransactionUseCase: CreateTransaction,
    private getAllTransactionsUseCase: GetAllTransactions,
    private getTransactionByIdUseCase: GetTransactionById,
    private updateTransactionUseCase: UpdateTransaction,
    private deleteTransactionUseCase: DeleteTransaction
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const data = CreateTransactionSchema.parse(req.body);

      const transaction = await this.createTransactionUseCase.execute(data);

      res.status(201).json({
        success: true,
        data: transaction,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const transactions = await this.getAllTransactionsUseCase.execute();

      res.status(200).json({
        success: true,
        data: transactions,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const transaction = await this.getTransactionByIdUseCase.execute(id);

      res.status(200).json({
        success: true,
        data: transaction,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = UpdateTransactionSchema.parse(req.body);
      const transaction = await this.updateTransactionUseCase.execute(id, data);

      res.status(200).json({
        success: true,
        data: transaction,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.deleteTransactionUseCase.execute(id);

      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  }
}
