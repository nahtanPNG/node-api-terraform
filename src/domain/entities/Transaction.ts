import { randomUUID } from "node:crypto";
import { z } from "zod";

const transactionSchema = z.object({
  amount: z.number().min(0.01, "Valor mínimo é R$ 0,01"),
  description: z.string().min(1, "Descrição é obrigatória").max(100),
  type: z.enum(["income", "expense"]),
});

export class Transaction {
  public readonly id: string;
  public readonly createdAt: Date;

  constructor(
    public readonly amount: number,
    public readonly description: string,
    public readonly type: "income" | "expense",
    id?: string
  ) {
    transactionSchema.parse({ amount, description, type });

    this.id = id || randomUUID();
    this.createdAt = new Date();
  }
}
