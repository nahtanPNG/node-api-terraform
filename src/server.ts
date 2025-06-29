import { app } from "./infrastructure/app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
  console.log(`💰 Transactions API: http://localhost:${PORT}/api/transactions`);
});
