import { Injectable, Logger } from '@nestjs/common';
import { UpdateOptionDto } from '../dto/update-option.dto';
import { UpdateOptionRepository } from '../repository';
import { FindOptionUseCase } from './find-option.use-case';

/**
 * Caso de uso responsável por atualizar os detalhes de uma opção.
 */
@Injectable()
export class UpdateOptionUseCase {
  constructor(
    private readonly updateOptionRepository: UpdateOptionRepository,
    private readonly findOptionUseCase: FindOptionUseCase,
    private readonly logger: Logger,
  ) {}

  /**
   * Garante que a opção exista, aplica as alterações e registra o evento.
   * @param id Identificador da opção.
   * @param data Campos que serão atualizados.
   */
  async execute(id: string, data: UpdateOptionDto) {
    await this.findOptionUseCase.execute(id);
    const option = await this.updateOptionRepository.update(id, data);
    this.logger.log(`Option updated: ${option.name}`);
    return option;
  }
}
