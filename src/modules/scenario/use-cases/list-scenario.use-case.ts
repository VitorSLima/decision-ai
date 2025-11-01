import { Injectable, Logger } from '@nestjs/common';
import { ListScenarioRepository } from '../repository';

/**
 * Caso de uso responsável por listar todos os cenários cadastrados.
 */
@Injectable()
export class ListScenarioUseCase {
  constructor(
    private readonly listScenarioRepository: ListScenarioRepository,
    private readonly logger: Logger,
  ) {}

  /**
   * Retorna a lista de cenários e registra a quantidade.
   */
  async execute() {
    const scenarios = await this.listScenarioRepository.list();
    this.logger.log(`Listed ${scenarios.length} scenarios`);
    return scenarios;
  }
}
