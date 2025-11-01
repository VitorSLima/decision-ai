import { Injectable, Logger } from '@nestjs/common';
import { DeleteOptionRepository } from '../repository';
import { FindOptionUseCase } from './find-option.use-case';

/**
 * Caso de uso responsável por remover uma opção existente.
 */
@Injectable()
export class DeleteOptionUseCase {
  constructor(
    private readonly deleteOptionRepository: DeleteOptionRepository,
    private readonly findOptionUseCase: FindOptionUseCase,
    private readonly logger: Logger,
  ) {}

  /**
   * Garante que a opção exista, executa a exclusão e registra o resultado.
   * @param id Identificador da opção.
   */
  async execute(id: string) {
    const option = await this.findOptionUseCase.execute(id);
    await this.deleteOptionRepository.delete(id);
    this.logger.log(`Option removed: ${option.name}`);
    return { id };
  }
}
