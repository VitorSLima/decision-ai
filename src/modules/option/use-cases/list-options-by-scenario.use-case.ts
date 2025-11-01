import { Injectable, Logger } from '@nestjs/common';
import { ListOptionByScenarioRepository } from '../repository';

/**
 * Caso de uso responsável por listar todas as opções de um cenário.
 */
@Injectable()
export class ListOptionsByScenarioUseCase {
  constructor(
    private readonly listOptionByScenarioRepository: ListOptionByScenarioRepository,
    private readonly logger: Logger,
  ) {}

  /**
   * Busca as opções do cenário e registra a quantidade encontrada.
   * @param scenarioId Identificador do cenário.
   */
  async execute(scenarioId: string) {
    const options = await this.listOptionByScenarioRepository.list(scenarioId);
    this.logger.log(
      `Listed ${options.length} options for scenario ${scenarioId}`,
    );
    return options;
  }
}
