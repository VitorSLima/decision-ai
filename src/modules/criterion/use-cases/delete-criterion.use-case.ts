import { Injectable, Logger } from '@nestjs/common';
import { DeleteCriterionRepository } from '../repository';
import { FindCriterionUseCase } from './find-criterion.use-case';

/**
 * Caso de uso responsável por remover critérios existentes.
 */
@Injectable()
export class DeleteCriterionUseCase {
  constructor(
    private readonly deleteCriterionRepository: DeleteCriterionRepository,
    private readonly findCriterionUseCase: FindCriterionUseCase,
    private readonly logger: Logger,
  ) {}

  /**
   * Confirma a existência do critério, executa a exclusão e registra o evento.
   * @param id Identificador do critério.
   */
  async execute(id: string) {
    const criterion = await this.findCriterionUseCase.execute(id);
    await this.deleteCriterionRepository.delete(id);
    this.logger.log(`Criterion removed: ${criterion.name}`);
    return { id };
  }
}
