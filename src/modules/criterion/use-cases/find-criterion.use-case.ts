import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FindCriterionRepository } from '../repository';

/**
 * Caso de uso responsável por localizar um critério específico.
 */
@Injectable()
export class FindCriterionUseCase {
  constructor(
    private readonly findCriterionRepository: FindCriterionRepository,
    private readonly logger: Logger,
  ) {}

  /**
   * Recupera um critério pelo identificador ou lança exceção se ausente.
   * @param id Identificador do critério.
   */
  async execute(id: string) {
    const criterion = await this.findCriterionRepository.findById(id);

    if (!criterion) {
      this.logger.warn(`Criterion not found: ${id}`);
      throw new NotFoundException(`Criterion ${id} not found`);
    }

    this.logger.log(`Criterion loaded: ${criterion.name}`);
    return criterion;
  }
}
