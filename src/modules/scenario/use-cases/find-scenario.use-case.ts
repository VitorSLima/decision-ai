import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FindScenarioRepository } from '../repository';

/**
 * Caso de uso responsável por localizar um cenário específico.
 */
@Injectable()
export class FindScenarioUseCase {
  constructor(
    private readonly findScenarioRepository: FindScenarioRepository,
    private readonly logger: Logger,
  ) {}

  /**
   * Recupera um cenário pelo identificador ou lança exceção.
   * @param id Identificador do cenário.
   */
  async execute(id: string) {
    const scenario = await this.findScenarioRepository.findById(id);

    if (!scenario) {
      this.logger.warn(`Scenario not found: ${id}`);
      throw new NotFoundException(`Scenario ${id} not found`);
    }

    this.logger.log(`Scenario loaded: ${scenario.title}`);
    return scenario;
  }
}
