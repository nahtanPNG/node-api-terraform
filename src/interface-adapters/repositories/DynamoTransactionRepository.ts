import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  ScanCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { Transaction } from "../../domain/entities/Transaction";
import { TransactionRepository } from "../../domain/repositories/TransactionRepository";

export class DynamoTransactionRepository implements TransactionRepository {
  private docClient: DynamoDBDocumentClient;

  constructor(dynamoClient: DynamoDBClient, private tableName: string) {
    this.docClient = DynamoDBDocumentClient.from(dynamoClient);
  }

  async save(transaction: Transaction): Promise<Transaction> {
    const command = new PutCommand({
      TableName: this.tableName,
      Item: {
        id: transaction.id,
        amount: transaction.amount,
        description: transaction.description,
        type: transaction.type,
        createdAt: transaction.createdAt.toISOString(),
      },
    });

    await this.docClient.send(command);
    return transaction;
  }

  async findById(id: string): Promise<Transaction | null> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: { id },
    });

    const result = await this.docClient.send(command);

    if (!result.Item) return null;

    return new Transaction(
      result.Item.amount,
      result.Item.description,
      result.Item.type as "income" | "expense",
      result.Item.id
    );
  }

  async findAll(): Promise<Transaction[]> {
    const command = new ScanCommand({
      TableName: this.tableName,
    });

    const result = await this.docClient.send(command);

    return (result.Items || []).map(
      (item) =>
        new Transaction(item.amount, item.description, item.type, item.id)
    );
  }

  async update(id: string, data: Partial<Transaction>): Promise<Transaction> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new Error("Transaction not found");
    }

    const updatedTransaction = new Transaction(
      data.amount ?? existing.amount,
      data.description ?? existing.description,
      data.type ?? existing.type,
      id
    );

    await this.save(updatedTransaction);
    return updatedTransaction;
  }

  async delete(id: string): Promise<void> {
    const command = new DeleteCommand({
      TableName: this.tableName,
      Key: { id },
    });

    await this.docClient.send(command);
  }
}
