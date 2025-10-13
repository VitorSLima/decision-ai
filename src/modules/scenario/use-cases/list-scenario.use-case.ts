import { Injectable, Logger } from '@nestjs/common';
import { ListScenarioRepository } from '../repository';

@Injectable()
export class ListScenarioUseCase {
  constructor(
    private readonly listScenarioRepository: ListScenarioRepository,
    private readonly logger: Logger,
  ) {}

  async execute() {
    const scenarios = await this.listScenarioRepository.list();
    this.logger.log(`Listed ${scenarios.length} scenarios`);
    return scenarios;
  }
}
