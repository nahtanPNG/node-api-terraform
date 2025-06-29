import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoTransactionRepository } from "../interface-adapters/repositories/DynamoTransactionRepository";
import { CreateTransaction } from "../use-cases/CreateTransaction";
import { GetAllTransactions } from "../use-cases/GetAllTransactions";
import { GetTransactionById } from "../use-cases/GetTransactionById";
import { UpdateTransaction } from "../use-cases/UpdateTransaction";
import { DeleteTransaction } from "../use-cases/DeleteTransaction";
import { TransactionController } from "../interface-adapters/controllers/TransactionController";

const dynamoClient = new DynamoDBClient({ region: "us-east-1" });
const transactionRepository = new DynamoTransactionRepository(
  dynamoClient,
  "transactions"
);

// Use Cases
const createTransactionUseCase = new CreateTransaction(transactionRepository);
const getAllTransactionsUseCase = new GetAllTransactions(transactionRepository);
const getTransactionByIdUseCase = new GetTransactionById(transactionRepository);
const updateTransactionUseCase = new UpdateTransaction(transactionRepository);
const deleteTransactionUseCase = new DeleteTransaction(transactionRepository);

// Controllers
export const transactionController = new TransactionController(
  createTransactionUseCase,
  getAllTransactionsUseCase,
  getTransactionByIdUseCase,
  updateTransactionUseCase,
  deleteTransactionUseCase
);
