import { Transaction } from "../domain/entities/Transaction";
import { TransactionRepository } from "../domain/repositories/TransactionRepository";

export class GetAllTransactions {
  constructor(private repository: TransactionRepository) {}

  async execute(): Promise<Transaction[]> {
    return await this.repository.findAll();
  }
}
