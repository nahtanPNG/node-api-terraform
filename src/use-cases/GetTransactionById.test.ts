import { describe, it, expect, vi } from "vitest";
import { GetTransactionById } from "./GetTransactionById";
import { TransactionRepository } from "../domain/repositories/TransactionRepository";
import { Transaction } from "../domain/entities/Transaction";

describe("GetTransactionById Use Case", () => {
  const mockRepository: TransactionRepository = {
    save: vi.fn(),
    findById: vi.fn(),
    findAll: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };

  it("should return transaction when found", async () => {
    const mockTransaction = new Transaction(100, "Salary", "income");
    mockRepository.findById = vi.fn().mockResolvedValue(mockTransaction);
    const useCase = new GetTransactionById(mockRepository);

    const result = await useCase.execute("test-id");

    expect(result).toEqual(mockTransaction);
    expect(mockRepository.findById).toHaveBeenCalledWith("test-id");
  });

  it("should throw error when transaction not found", async () => {
    mockRepository.findById = vi.fn().mockResolvedValue(null);
    const useCase = new GetTransactionById(mockRepository);

    await expect(useCase.execute("non-existent-id")).rejects.toThrow(
      "Transação não encontrada"
    );
  });

  it("should throw error when id is empty", async () => {
    const useCase = new GetTransactionById(mockRepository);

    await expect(useCase.execute("")).rejects.toThrow("ID é obrigatório");
  });
});
