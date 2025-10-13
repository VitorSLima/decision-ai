import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FindOptionRepository } from '../repository';

@Injectable()
export class FindOptionUseCase {
  constructor(
    private readonly findOptionRepository: FindOptionRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string) {
    const option = await this.findOptionRepository.findById(id);

    if (!option) {
      this.logger.warn(`Option not found: ${id}`);
      throw new NotFoundException(`Option ${id} not found`);
    }

    this.logger.log(`Option loaded: ${option.name}`);
    return option;
  }
}
