import { Injectable, Logger } from '@nestjs/common';
import { UpdateCriterionDto } from '../dto/update-criterion.dto';
import { UpdateCriterionRepository } from '../repository';
import { FindCriterionUseCase } from './find-criterion.use-case';

/**
 * Caso de uso responsável por atualizar critérios existentes.
 */
@Injectable()
export class UpdateCriterionUseCase {
  constructor(
    private readonly updateCriterionRepository: UpdateCriterionRepository,
    private readonly findCriterionUseCase: FindCriterionUseCase,
    private readonly logger: Logger,
  ) {}

  /**
   * Confere a existência do critério antes de aplicar alterações.
   * @param id Identificador do critério.
   * @param data Dados que serão atualizados.
   */
  async execute(id: string, data: UpdateCriterionDto) {
    await this.findCriterionUseCase.execute(id);
    const criterion = await this.updateCriterionRepository.update(id, data);
    this.logger.log(`Criterion updated: ${criterion.name}`);
    return criterion;
  }
}
