import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FindOptionRepository } from '../repository';

/**
 * Caso de uso responsável por buscar uma opção pelo identificador.
 */
@Injectable()
export class FindOptionUseCase {
  constructor(
    private readonly findOptionRepository: FindOptionRepository,
    private readonly logger: Logger,
  ) {}

  /**
   * Carrega uma opção ou lança exceção caso não exista.
   * @param id Identificador da opção.
   */
  async execute(id: string) {
    const option = await this.findOptionRepository.findById(id);

    if (!option) {
      this.logger.warn(`Option not found: ${id}`);
      throw new NotFoundException(`Option ${id} not found`);
    }

    this.logger.log(`Option loaded: ${option.name}`);
    return option;
  }
}
