import { Transaction } from "../entities/Transaction";

export interface TransactionRepository {
  save(transaction: Transaction): Promise<Transaction>;
  findById(id: string): Promise<Transaction | null>;
  findAll(): Promise<Transaction[]>;
  update(id: string, transaction: Partial<Transaction>): Promise<Transaction>;
  delete(id: string): Promise<void>;
}
