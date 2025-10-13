import { Injectable, Logger } from '@nestjs/common';
import { ListCriterionRepository } from '../repository';

@Injectable()
export class ListCriteriaUseCase {
  constructor(
    private readonly listCriterionRepository: ListCriterionRepository,
    private readonly logger: Logger,
  ) {}

  async execute() {
    const criteria = await this.listCriterionRepository.list();
    this.logger.log(`Listed ${criteria.length} criteria`);
    return criteria;
  }
}
