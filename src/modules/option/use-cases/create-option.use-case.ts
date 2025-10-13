import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateOptionDto } from '../dto/create-option.dto';
import { CreateOptionRepository } from '../repository';

@Injectable()
export class CreateOptionUseCase {
  constructor(
    private readonly createOptionRepository: CreateOptionRepository,
    private readonly logger: Logger,
  ) {}

  async execute(scenarioId: string, data: CreateOptionDto) {
    // ensure scenario exists by checking if there are options? Not good; better to rely on prisma create error.
    try {
      const option = await this.createOptionRepository.create(scenarioId, data);
      this.logger.log(`Option created for scenario ${scenarioId}: ${option.name}`);
      return option;
    } catch (error) {
      if (error.code === 'P2003') {
        // Prisma foreign key constraint failed
        throw new NotFoundException(`Scenario ${scenarioId} not found`);
      }
      this.logger.error(error);
      throw error;
    }
  }
}
