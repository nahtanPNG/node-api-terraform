import { Request, Response } from "express";
import { CreateTransaction } from "../../use-cases/CreateTransaction";
import { z } from "zod";
import { GetAllTransactions } from "../../use-cases/GetAllTransactions";
import { GetTransactionById } from "../../use-cases/GetTransactionById";

const CreateTransactionSchema = z.object({
  amount: z.number(),
  description: z.string(),
  type: z.enum(["income", "expense"]),
});

export class TransactionController {
  constructor(
    private createTransactionUseCase: CreateTransaction,
    private getAllTransactionsUseCase: GetAllTransactions,
    private getTransactionByIdUseCase: GetTransactionById
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
}
