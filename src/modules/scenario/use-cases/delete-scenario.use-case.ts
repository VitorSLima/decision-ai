import { Injectable, Logger } from '@nestjs/common';
import { DeleteScenarioRepository } from '../repository/delete-scenario.repository';
import { FindScenarioUseCase } from './find-scenario.use-case';

@Injectable()
export class DeleteScenarioUseCase {
  constructor(
    private readonly deleteScenarioRepository: DeleteScenarioRepository,
    private readonly findScenarioUseCase: FindScenarioUseCase,
    private readonly logger: Logger,
  ) {}

  async execute(id: string) {
    const scenario = await this.findScenarioUseCase.execute(id);
    await this.deleteScenarioRepository.delete(id);
    this.logger.log(`Scenario removed: ${scenario.title}`);
    return { id };
  }
}
