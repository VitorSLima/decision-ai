/**
 * Garante que uma condição seja verdadeira, caso contrário, lança um erro
 * @param condition - Condição a ser verificada
 * @param message - Mensagem de erro a ser lançada
 */
export function ensure(condition: any, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
