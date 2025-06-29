import { Transaction } from "../domain/entities/Transaction";
import { TransactionRepository } from "../domain/repositories/TransactionRepository";

export class CreateTransaction {
  constructor(private repository: TransactionRepository) {}

  async execute(data: {
    amount: number;
    description: string;
    type: "income" | "expense";
  }): Promise<Transaction> {
    const todayTransactions = await this.getTodayTransactionsCount();
    if (todayTransactions >= 10) {
      throw new Error("Limite de 10 transações diárias excedido");
    }

    const transaction = new Transaction(
      data.amount,
      data.description,
      data.type
    );

    return await this.repository.save(transaction);
  }

  private async getTodayTransactionsCount(): Promise<number> {
    // TODO: Aceitar data por parâmetros
    const all = await this.repository.findAll();
    const today = new Date().toDateString();
    return all.filter((t) => t.createdAt.toDateString() === today).length;
  }
}
