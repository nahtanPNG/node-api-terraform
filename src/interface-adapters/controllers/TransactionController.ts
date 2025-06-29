import { Request, Response } from "express";
import { CreateTransaction } from "../../use-cases/CreateTransaction";
import { z } from "zod";

const CreateTransactionSchema = z.object({
  amount: z.number(),
  description: z.string(),
  type: z.enum(["income", "expense"]),
});

export class TransactionController {
  constructor(private createTransactionUseCase: CreateTransaction) {}

  async save(req: Request, res: Response): Promise<void> {
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
}
