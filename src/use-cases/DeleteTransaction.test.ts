import { describe, it, expect, vi } from "vitest";
import { DeleteTransaction } from "./DeleteTransaction";
import { TransactionRepository } from "../domain/repositories/TransactionRepository";
import { Transaction } from "../domain/entities/Transaction";

describe("DeleteTransaction Use Case", () => {
  const mockRepository: TransactionRepository = {
    save: vi.fn(),
    findById: vi.fn(),
    findAll: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };

  it("should delete transaction when found", async () => {
    const mockTransaction = new Transaction(100, "Salary", "income");
    mockRepository.findById = vi.fn().mockResolvedValue(mockTransaction);
    mockRepository.delete = vi.fn().mockResolvedValue(undefined);
    const useCase = new DeleteTransaction(mockRepository);

    await useCase.execute("test-id");

    expect(mockRepository.findById).toHaveBeenCalledWith("test-id");
    expect(mockRepository.delete).toHaveBeenCalledWith("test-id");
  });

  it("should throw error when transaction not found", async () => {
    mockRepository.findById = vi.fn().mockResolvedValue(null);
    const useCase = new DeleteTransaction(mockRepository);

    await expect(useCase.execute("non-existent-id")).rejects.toThrow(
      "Transação não encontrada"
    );
  });

  it("should throw error when id is empty", async () => {
    const useCase = new DeleteTransaction(mockRepository);

    await expect(useCase.execute("")).rejects.toThrow("ID é obrigatório");
  });
});
