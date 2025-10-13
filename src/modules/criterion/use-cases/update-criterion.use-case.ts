import { Injectable, Logger } from '@nestjs/common';
import { UpdateCriterionDto } from '../dto/update-criterion.dto';
import { UpdateCriterionRepository } from '../repository';
import { FindCriterionUseCase } from './find-criterion.use-case';

@Injectable()
export class UpdateCriterionUseCase {
  constructor(
    private readonly updateCriterionRepository: UpdateCriterionRepository,
    private readonly findCriterionUseCase: FindCriterionUseCase,
    private readonly logger: Logger,
  ) {}

  async execute(id: string, data: UpdateCriterionDto) {
    await this.findCriterionUseCase.execute(id);
    const criterion = await this.updateCriterionRepository.update(id, data);
    this.logger.log(`Criterion updated: ${criterion.name}`);
    return criterion;
  }
}
