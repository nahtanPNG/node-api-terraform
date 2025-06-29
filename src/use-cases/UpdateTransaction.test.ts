// src/use-cases/UpdateTransaction.test.ts
import { describe, it, expect, vi } from "vitest";
import { UpdateTransaction } from "./UpdateTransaction";
import { TransactionRepository } from "../domain/repositories/TransactionRepository";
import { Transaction } from "../domain/entities/Transaction";

describe("UpdateTransaction Use Case", () => {
  const mockRepository: TransactionRepository = {
    save: vi.fn(),
    findById: vi.fn(),
    findAll: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };

  it("should update transaction when found", async () => {
    const existingTransaction = new Transaction(
      100,
      "Old description",
      "income",
      "test-id"
    );
    mockRepository.findById = vi.fn().mockResolvedValue(existingTransaction);
    mockRepository.save = vi.fn().mockImplementation((t) => Promise.resolve(t));
    const useCase = new UpdateTransaction(mockRepository);

    const result = await useCase.execute("test-id", {
      amount: 200,
      description: "New description",
    });

    expect(result.amount).toBe(200);
    expect(result.description).toBe("New description");
    expect(result.type).toBe("income"); // manteve o original
    expect(result.id).toBe("test-id"); // manteve o ID
    expect(mockRepository.save).toHaveBeenCalledWith(result);
  });

  it("should throw error when transaction not found", async () => {
    mockRepository.findById = vi.fn().mockResolvedValue(null);
    const useCase = new UpdateTransaction(mockRepository);

    await expect(
      useCase.execute("non-existent-id", { amount: 200 })
    ).rejects.toThrow("Transação não encontrada");
  });

  it("should throw error when id is empty", async () => {
    const useCase = new UpdateTransaction(mockRepository);

    await expect(useCase.execute("", { amount: 200 })).rejects.toThrow(
      "ID é obrigatório"
    );
  });
});
