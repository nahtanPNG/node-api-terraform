import { describe, it, expect } from "vitest";
import { Transaction } from "./Transaction";

describe("Transaction Entity", () => {
  it("should create a valid transaction", () => {
    const transaction = new Transaction(100.5, "Salary", "income");

    expect(transaction.amount).toBe(100.5);
    expect(transaction.description).toBe("Salary");
    expect(transaction.type).toBe("income");
    expect(transaction.id).toBeDefined();
    expect(transaction.createdAt).toBeInstanceOf(Date);
  });

  it("should throw error for invalid amount", () => {
    expect(() => {
      new Transaction(0, "Invalid", "income");
    }).toThrow("Valor mínimo é R$ 0,01");
  });

  it("should throw error for empty description", () => {
    expect(() => {
      new Transaction(0, "", "income");
    }).toThrow("Descrição é obrigatória");
  });

  it("should throw error for invalid type", () => {
    expect(() => {
      new Transaction(10.5, "Test", "invalid" as any);
    }).toThrow();
  });

  it("should accept custom id", () => {
    const customId = "custom-123";
    const transaction = new Transaction(10.5, "Test", "income", customId);

    expect(transaction.id).toBe(customId);
  });
});
