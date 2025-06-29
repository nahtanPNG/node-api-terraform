# NodeJs + Terraform Transaction Api

A serverless REST API for managing financial transactions built with Node.js, TypeScript, and AWS services following Clean Architecture principles.

## 🏗️ AWS Infrastructure


## 🛠️ Tech Stack

- **Runtime**: Node.js 18.x + TypeScript
- **Framework**: Express.js
- **Database**: DynamoDB
- **Infrastructure**: Terraform
- **Testing**: Vitest
- **Validation**: Zod

## 🚦 API Endpoints

| Method   | Endpoint                | Description           |
| -------- | ----------------------- | --------------------- |
| `POST`   | `/api/transactions`     | Create transaction    |
| `GET`    | `/api/transactions`     | List all transactions |
| `GET`    | `/api/transactions/:id` | Get transaction by ID |
| `PUT`    | `/api/transactions/:id` | Update transaction    |
| `DELETE` | `/api/transactions/:id` | Delete transaction    |

## 🏃‍♂️ Quick Start

### Local Development
```bash
npm install
npm run dev    # http://localhost:3000
npm test       # Run tests
```

### Deploy to AWS
```bash
npm run build:lambda
cd terraform
terraform init
terraform apply
```

## 📁 Project Structure

```
src/
├── domain/              # Business entities & interfaces
├── use-cases/           # Application logic
├── interface-adapters/  # Controllers & repositories
└── infrastructure/      # Express app & AWS configs

terraform/               # Infrastructure as Code
```

## 📚 Learning Focus

Study project exploring Clean Architecture, Domain-Driven Design, serverless AWS deployment, and Infrastructure as Code with Terraform.

## 📝 License

ISC

---

**Made with ❤️ by [nahtanPNG](https://github.com/nahtanPNG)**