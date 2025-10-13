import { Injectable, Logger } from '@nestjs/common';
import { CreateCriterionDto } from '../dto/create-criterion.dto';
import { CreateCriterionRepository } from '../repository';

@Injectable()
export class CreateCriterionUseCase {
  constructor(
    private readonly createCriterionRepository: CreateCriterionRepository,
    private readonly logger: Logger,
  ) {}

  async execute(data: CreateCriterionDto) {
    const criterion = await this.createCriterionRepository.create(data);
    this.logger.log(`Criterion created: ${criterion.name}`);
    return criterion;
  }
}
