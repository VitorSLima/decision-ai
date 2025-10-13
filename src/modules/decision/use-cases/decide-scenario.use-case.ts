import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DecisionRepository } from '../repository';

@Injectable()
export class DecideScenarioUseCase {
  constructor(
    private readonly decisionRepository: DecisionRepository,
    private readonly logger: Logger,
  ) {}

  async execute(scenarioId: string) {
    const scenario = await this.decisionRepository.getScenarioWithOptions(scenarioId);

    if (!scenario) {
      this.logger.warn(`Scenario not found for decision: ${scenarioId}`);
      throw new NotFoundException(`Scenario ${scenarioId} not found`);
    }

    const options = scenario.options.map((option) => {
      const matchedCriteria = option.scores
        .filter((score) => score.criterion.active)
        .map((score) => ({
          id: score.criterion.id,
          name: score.criterion.name,
          weight: score.criterion.weight,
        }));

      const totalScore = matchedCriteria.reduce((sum, criterion) => sum + criterion.weight, 0);

      return {
        id: option.id,
        name: option.name,
        description: option.description,
        totalScore,
        matchedCriteria,
      };
    });

    const optionsSorted = [...options].sort((a, b) => b.totalScore - a.totalScore);
    const topScore = optionsSorted[0]?.totalScore ?? 0;

    const bestOptions = optionsSorted.filter((option) => option.totalScore === topScore);

    const decision = {
      scenario: {
        id: scenario.id,
        title: scenario.title,
        description: scenario.description,
      },
      options: optionsSorted,
      bestOptions,
    };

    this.logger.log(`Decision computed for scenario ${scenario.title}`);
    return decision;
  }
}
