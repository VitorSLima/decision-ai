type CriterionScore = {
  id: string;
  name: string;
  weight: number;
};

type ScenarioOption = {
  id: string;
  name: string;
  description: string | null;
  totalScore: number;
  matchedCriteria: CriterionScore[];
};

type ScenarioScore = {
  criterion: {
    id: string;
    name: string;
    weight: number;
    active: boolean;
  };
};

type ScenarioWithOptions = {
  id: string;
  title: string;
  description: string | null;
  options: Array<{
    id: string;
    name: string;
    description: string | null;
    scores: ScenarioScore[];
  }>;
};

type Decision = {
  scenario: {
    id: string;
    title: string;
    description: string | null;
  };
  options: ScenarioOption[];
  bestOptions: ScenarioOption[];
};

/**
 * Monta a estrutura de decisão a partir de um cenário carregado com opções e critérios.
 */
export function buildDecisionFromScenario(scenario: ScenarioWithOptions): Decision {
  const options = scenario.options.map((option) => {
    const matchedCriteria = option.scores
      .filter((score) => score.criterion.active)
      .map((score) => ({
        id: score.criterion.id,
        name: score.criterion.name,
        weight: score.criterion.weight,
      }));

    const totalScore = matchedCriteria.reduce(
      (sum, criterion) => sum + criterion.weight,
      0,
    );

    return {
      id: option.id,
      name: option.name,
      description: option.description,
      totalScore,
      matchedCriteria,
    };
  });

  const optionsSorted = [...options].sort(
    (a, b) => b.totalScore - a.totalScore,
  );
  const topScore = optionsSorted[0]?.totalScore ?? 0;

  const bestOptions = optionsSorted.filter(
    (option) => option.totalScore === topScore,
  );

  return {
    scenario: {
      id: scenario.id,
      title: scenario.title,
      description: scenario.description,
    },
    options: optionsSorted,
    bestOptions,
  };
}
