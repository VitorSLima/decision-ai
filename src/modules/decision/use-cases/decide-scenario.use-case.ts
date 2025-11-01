import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DecisionRepository } from '../repository';
import { buildDecisionFromScenario } from './decision-calculator';

/**
 * Caso de uso responsável por calcular a decisão de um cenário.
 */
@Injectable()
export class DecideScenarioUseCase {
  constructor(
    private readonly decisionRepository: DecisionRepository,
    private readonly logger: Logger,
  ) {}

  /**
   * Calcula a pontuação ponderada das opções de um cenário.
   * @param scenarioId Identificador do cenário.
   */
  async execute(scenarioId: string) {
    const scenario =
      await this.decisionRepository.getScenarioWithOptions(scenarioId);

    if (!scenario) {
      this.logger.warn(`Scenario not found for decision: ${scenarioId}`);
      throw new NotFoundException(`Scenario ${scenarioId} not found`);
    }

    const decision = buildDecisionFromScenario(scenario);

    this.logger.log(`Decision computed for scenario ${scenario.title}`);
    return decision;
  }
}
