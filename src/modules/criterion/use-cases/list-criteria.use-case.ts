import { Injectable, Logger } from '@nestjs/common';
import { ListCriterionRepository } from '../repository';

/**
 * Caso de uso responsável por listar todos os critérios cadastrados.
 */
@Injectable()
export class ListCriteriaUseCase {
  constructor(
    private readonly listCriterionRepository: ListCriterionRepository,
    private readonly logger: Logger,
  ) {}

  /**
   * Retorna a coleção de critérios registrando a contagem.
   */
  async execute() {
    const criteria = await this.listCriterionRepository.list();
    this.logger.log(`Listed ${criteria.length} criteria`);
    return criteria;
  }
}
