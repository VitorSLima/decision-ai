import { Injectable, Logger } from '@nestjs/common';
import { DeleteScoreRepository } from '../repository';
import { FindScoreUseCase } from './find-score.use-case';

/**
 * Caso de uso responsável por remover vínculos entre opção e critério.
 */
@Injectable()
export class DeleteScoreUseCase {
  constructor(
    private readonly deleteScoreRepository: DeleteScoreRepository,
    private readonly findScoreUseCase: FindScoreUseCase,
    private readonly logger: Logger,
  ) {}

  /**
   * Garante que o vínculo exista antes de removê-lo.
   * @param id Identificador do score.
   */
  async execute(id: string) {
    await this.findScoreUseCase.execute(id);
    await this.deleteScoreRepository.delete(id);
    this.logger.log(`Score removed: ${id}`);
    return { id };
  }
}
