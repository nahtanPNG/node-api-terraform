output "api_gateway_url" {
  description = "URL do API Gateway"
  value       = aws_apigatewayv2_api.api.api_endpoint
}

output "dynamodb_table_name" {
  description = "Nome da tabela DynamoDB"
  value       = aws_dynamodb_table.transactions.name
}

output "lambda_function_name" {
  description = "Nome da função Lambda"
  value       = aws_lambda_function.api.function_name
}
