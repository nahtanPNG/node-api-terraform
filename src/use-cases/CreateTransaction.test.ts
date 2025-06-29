// src/use-cases/CreateTransaction.test.ts
import { describe, it, expect, vi } from "vitest";
import { CreateTransaction } from "./CreateTransaction";
import { TransactionRepository } from "../domain/repositories/TransactionRepository";

describe("CreateTransaction Use Case", () => {
  const mockRepository: TransactionRepository = {
    create: vi.fn(),
    findById: vi.fn(),
    findAll: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };

  it("should create a transaction successfully", async () => {
    mockRepository.findAll = vi.fn().mockResolvedValue([]);
    mockRepository.create = vi
      .fn()
      .mockImplementation((t) => Promise.resolve(t));
    const useCase = new CreateTransaction(mockRepository);

    const result = await useCase.execute({
      amount: 100.5,
      description: "Test transaction",
      type: "income",
    });

    expect(result.amount).toBe(100.5);
    expect(mockRepository.create).toHaveBeenCalledOnce();
  });

  it("should throw error when daily limit exceeded", async () => {
    const tenTransactionsToday = Array(10)
      .fill(null)
      .map(() => ({
        id: "test-id",
        amount: 10,
        description: "Test",
        type: "income",
        createdAt: new Date(),
      }));

    mockRepository.findAll = vi.fn().mockResolvedValue(tenTransactionsToday);
    const useCase = new CreateTransaction(mockRepository);

    await expect(
      useCase.execute({
        amount: 100.5,
        description: "Test transaction",
        type: "income",
      })
    ).rejects.toThrow("Limite de 10 transações diárias excedido");
  });
});
