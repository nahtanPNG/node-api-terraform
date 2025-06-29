import { Transaction } from "../../domain/entities/Transaction";
import { TransactionRepository } from "../../domain/repositories/TransactionRepository";

export class InMemoryTransactionRepository implements TransactionRepository {
  private transactions: Transaction[] = [];

  async save(transaction: Transaction): Promise<Transaction> {
    this.transactions = this.transactions.filter(
      (t) => t.id !== transaction.id
    );
    this.transactions.push(transaction);
    return transaction;
  }

  async findById(id: string): Promise<Transaction | null> {
    return this.transactions.find((t) => t.id === id) || null;
  }

  async findAll(): Promise<Transaction[]> {
    return [...this.transactions];
  }

  async update(id: string, data: Partial<Transaction>): Promise<Transaction> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new Error("Transaction not found");
    }

    const updated = new Transaction(
      data.amount ?? existing.amount,
      data.description ?? existing.description,
      data.type ?? existing.type,
      id
    );

    await this.save(updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    this.transactions = this.transactions.filter((t) => t.id !== id);
  }
}
