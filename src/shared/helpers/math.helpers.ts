/**
 * Normaliza os pesos para que a soma dos pesos seja 1
 * @param weights - Array de pesos
 * @returns Array de pesos normalizados
 */
export function normalizeWeights(weights: number[]): number[] {
  const sum = weights.reduce((a, b) => a + (isFinite(b) ? b : 0), 0);
  if (sum <= 0) return weights.map(() => 0); // evita NaN
  return weights.map((w) => w / sum);
}

/**
 * Calcula a pontuação ponderada
 * @param values0to10 - Array de valores de 0 a 10
 * @param normWeights - Array de pesos normalizados
 * @returns Pontuação ponderada
 */
export function weightedScore(
  values0to10: number[],
  normWeights: number[],
): number {
  // soma(value/10 * weight)
  return values0to10.reduce(
    (acc, v, i) =>
      acc + (Math.max(0, Math.min(10, v)) / 10) * (normWeights[i] ?? 0),
    0,
  );
}

/**
 * Ordena os itens em ordem decrescente com base nas pontuações
 * @param items - Array de itens
 * @param scores - Array de pontuações
 * @returns Array de itens ordenados
 */
export function rankDescending<T>(items: T[], scores: number[]) {
  return items
    .map((item, i) => ({ item, score: Number(scores[i]?.toFixed(4)) }))
    .sort((a, b) => b.score - a.score);
}
