import { Injectable, Logger } from '@nestjs/common';
import { UpdateScenarioDto } from '../dto/update-scenario.dto';
import { UpdateScenarioRepository } from '../repository';
import { FindScenarioUseCase } from './find-scenario.use-case';

/**
 * Caso de uso responsável por atualizar cenários existentes.
 */
@Injectable()
export class UpdateScenarioUseCase {
  constructor(
    private readonly updateScenarioRepository: UpdateScenarioRepository,
    private readonly findScenarioUseCase: FindScenarioUseCase,
    private readonly logger: Logger,
  ) {}

  /**
   * Garante a existência do cenário, aplica a atualização e registra o evento.
   * @param id Identificador do cenário.
   * @param data Dados para atualização.
   */
  async execute(id: string, data: UpdateScenarioDto) {
    // Ensure scenario exists before attempting update
    await this.findScenarioUseCase.execute(id);
    const scenario = await this.updateScenarioRepository.update(id, data);
    this.logger.log(`Scenario updated: ${scenario.title}`);
    return scenario;
  }
}
