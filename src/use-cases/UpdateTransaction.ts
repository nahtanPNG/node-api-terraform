import { Transaction } from "../domain/entities/Transaction";
import { TransactionRepository } from "../domain/repositories/TransactionRepository";

export class UpdateTransaction {
  constructor(private repository: TransactionRepository) {}

  async execute(
    id: string,
    data: {
      amount?: number;
      description?: string;
      type?: "income" | "expense";
    }
  ): Promise<Transaction> {
    if (!id || id.trim() === "") {
      throw new Error("ID é obrigatório");
    }

    const existingTransaction = await this.repository.findById(id);
    if (!existingTransaction) {
      throw new Error("Transação não encontrada");
    }

    const updatedTransaction = new Transaction(
      data.amount ?? existingTransaction.amount,
      data.description ?? existingTransaction.description,
      data.type ?? existingTransaction.type,
      id
    );

    await this.repository.save(updatedTransaction);
    return updatedTransaction;
  }
}
