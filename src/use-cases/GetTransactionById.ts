import { Transaction } from "../domain/entities/Transaction";
import { TransactionRepository } from "../domain/repositories/TransactionRepository";

export class GetTransactionById {
  constructor(private repository: TransactionRepository) {}

  async execute(id: string): Promise<Transaction> {
    if (!id || id.trim() === "") {
      throw new Error("ID é obrigatório");
    }

    const transaction = await this.repository.findById(id);

    if (!transaction) {
      throw new Error("Transação não encontrada");
    }

    return transaction;
  }
}
