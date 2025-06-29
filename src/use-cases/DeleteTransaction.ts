import { TransactionRepository } from "../domain/repositories/TransactionRepository";

export class DeleteTransaction {
  constructor(private repository: TransactionRepository) {}

  async execute(id: string): Promise<void> {
    if (!id || id.trim() === "") {
      throw new Error("ID é obrigatório");
    }

    const transaction = await this.repository.findById(id);

    if (!transaction) {
      throw new Error("Transação não encontrada");
    }

    await this.repository.delete(id);
  }
}
