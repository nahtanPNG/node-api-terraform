import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoTransactionRepository } from "../interface-adapters/repositories/DynamoTransactionRepository";
import { CreateTransaction } from "../use-cases/CreateTransaction";
import { TransactionController } from "../interface-adapters/controllers/TransactionController";

// Configuração das dependências
const dynamoClient = new DynamoDBClient({ region: "us-east-1" });
const transactionRepository = new DynamoTransactionRepository(
  dynamoClient,
  "transactions"
);

// Use Cases
const createTransactionUseCase = new CreateTransaction(transactionRepository);

// Controllers
export const transactionController = new TransactionController(
  createTransactionUseCase
);
