import { Injectable, Logger } from '@nestjs/common';
import { ListScoreRepository } from '../repository';

/**
 * Caso de uso responsável por listar todos os vínculos entre opções e critérios.
 */
@Injectable()
export class ListScoresUseCase {
  constructor(
    private readonly listScoreRepository: ListScoreRepository,
    private readonly logger: Logger,
  ) {}

  /**
   * Retorna a lista de scores registrados com seus relacionamentos.
   */
  async execute() {
    const scores = await this.listScoreRepository.list();
    this.logger.log(`Listed ${scores.length} scores`);
    return scores;
  }
}
