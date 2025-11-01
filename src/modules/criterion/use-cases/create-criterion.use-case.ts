import { Injectable, Logger } from '@nestjs/common';
import { CreateCriterionDto } from '../dto/create-criterion.dto';
import { CreateCriterionRepository } from '../repository';

/**
 * Caso de uso responsável por cadastrar critérios.
 */
@Injectable()
export class CreateCriterionUseCase {
  constructor(
    private readonly createCriterionRepository: CreateCriterionRepository,
    private readonly logger: Logger,
  ) {}

  /**
   * Persiste um critério e registra o evento.
   * @param data Dados do novo critério.
   */
  async execute(data: CreateCriterionDto) {
    const criterion = await this.createCriterionRepository.create(data);
    this.logger.log(`Criterion created: ${criterion.name}`);
    return criterion;
  }
}
