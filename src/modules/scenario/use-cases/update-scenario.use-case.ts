import { Injectable, Logger } from '@nestjs/common';
import { UpdateScenarioDto } from '../dto/update-scenario.dto';
import { UpdateScenarioRepository } from '../repository';
import { FindScenarioUseCase } from './find-scenario.use-case';

@Injectable()
export class UpdateScenarioUseCase {
  constructor(
    private readonly updateScenarioRepository: UpdateScenarioRepository,
    private readonly findScenarioUseCase: FindScenarioUseCase,
    private readonly logger: Logger,
  ) {}

  async execute(id: string, data: UpdateScenarioDto) {
    // Ensure scenario exists before attempting update
    await this.findScenarioUseCase.execute(id);
    const scenario = await this.updateScenarioRepository.update(id, data);
    this.logger.log(`Scenario updated: ${scenario.title}`);
    return scenario;
  }
}
