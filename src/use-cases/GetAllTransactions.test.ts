import { describe, it, expect, vi } from "vitest";
import { GetAllTransactions } from "./GetAllTransactions";
import { TransactionRepository } from "../domain/repositories/TransactionRepository";
import { Transaction } from "../domain/entities/Transaction";

describe("GetAllTransactions Use Case", () => {
  const mockRepository: TransactionRepository = {
    save: vi.fn(),
    findById: vi.fn(),
    findAll: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };

  it("should return all transactions", async () => {
    const mockTransactions = [
      new Transaction(100, "Salary", "income"),
      new Transaction(50, "Coffee", "expense"),
    ];
    mockRepository.findAll = vi.fn().mockResolvedValue(mockTransactions);
    const useCase = new GetAllTransactions(mockRepository);

    const result = await useCase.execute();

    expect(result).toEqual(mockTransactions);
    expect(mockRepository.findAll).toHaveBeenCalledOnce();
  });

  it("should return empty array when no transactions exist", async () => {
    mockRepository.findAll = vi.fn().mockResolvedValue([]);
    const useCase = new GetAllTransactions(mockRepository);

    const result = await useCase.execute();

    expect(result).toEqual([]);
    expect(mockRepository.findAll).toHaveBeenCalledOnce();
  });
});
