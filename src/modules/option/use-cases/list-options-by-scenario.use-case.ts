import { Injectable, Logger } from '@nestjs/common';
import { ListOptionByScenarioRepository } from '../repository';

@Injectable()
export class ListOptionsByScenarioUseCase {
  constructor(
    private readonly listOptionByScenarioRepository: ListOptionByScenarioRepository,
    private readonly logger: Logger,
  ) {}

  async execute(scenarioId: string) {
    const options = await this.listOptionByScenarioRepository.list(scenarioId);
    this.logger.log(
      `Listed ${options.length} options for scenario ${scenarioId}`,
    );
    return options;
  }
}
