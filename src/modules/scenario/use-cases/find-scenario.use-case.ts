import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FindScenarioRepository } from '../repository';

@Injectable()
export class FindScenarioUseCase {
  constructor(
    private readonly findScenarioRepository: FindScenarioRepository,
    private readonly logger: Logger,
  ) {}

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
