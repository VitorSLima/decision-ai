import { Injectable, Logger } from '@nestjs/common';
import { CreateScenarioDto } from '../dto/create-scenario.dto';
import { CreateScenarioRepository } from '../repository/create-scenario.repository';

/**
 * Caso de uso responsável por cadastrar novos cenários.
 */
@Injectable()
export class CreateScenarioUseCase {
  constructor(
    private readonly createScenarioRepository: CreateScenarioRepository,
    private readonly logger: Logger,
  ) {}

  /**
   * Persiste um cenário e registra o resultado.
   * @param data Dados do cenário.
   */
  async execute(data: CreateScenarioDto) {
    try {
      const scenario = await this.createScenarioRepository.create(data);
      this.logger.log(`Scenario created: ${scenario.title}`);
      return scenario;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
