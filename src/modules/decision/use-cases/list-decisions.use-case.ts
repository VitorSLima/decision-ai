import { Injectable, Logger } from '@nestjs/common';
import { DecisionRepository } from '../repository';
import { buildDecisionFromScenario } from './decision-calculator';

/**
 * Caso de uso responsável por listar as decisões calculadas para todos os cenários.
 */
@Injectable()
export class ListDecisionsUseCase {
  constructor(
    private readonly decisionRepository: DecisionRepository,
    private readonly logger: Logger,
  ) {}

  /**
   * Processa cada cenário disponível e retorna a decisão correspondente.
   */
  async execute() {
    const scenarios =
      await this.decisionRepository.listScenariosWithOptions();

    const decisions = scenarios.map(buildDecisionFromScenario);

    this.logger.log(`Decision list computed with ${decisions.length} items`);
    return decisions;
  }
}
