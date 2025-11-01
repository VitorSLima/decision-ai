import { Injectable, Logger } from '@nestjs/common';
import { DeleteScenarioRepository } from '../repository/delete-scenario.repository';
import { FindScenarioUseCase } from './find-scenario.use-case';

/**
 * Caso de uso responsável por remover cenários cadastrados.
 */
@Injectable()
export class DeleteScenarioUseCase {
  constructor(
    private readonly deleteScenarioRepository: DeleteScenarioRepository,
    private readonly findScenarioUseCase: FindScenarioUseCase,
    private readonly logger: Logger,
  ) {}

  /**
   * Garante que o cenário exista, executa a exclusão e registra o evento.
   * @param id Identificador do cenário.
   */
  async execute(id: string) {
    const scenario = await this.findScenarioUseCase.execute(id);
    await this.deleteScenarioRepository.delete(id);
    this.logger.log(`Scenario removed: ${scenario.title}`);
    return { id };
  }
}
