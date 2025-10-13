import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FindScoreRepository } from '../repository';

@Injectable()
export class FindScoreUseCase {
  constructor(
    private readonly findScoreRepository: FindScoreRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string) {
    const score = await this.findScoreRepository.findById(id);

    if (!score) {
      this.logger.warn(`Score not found: ${id}`);
      throw new NotFoundException(`Score ${id} not found`);
    }

    this.logger.log(`Score loaded: ${score.id}`);
    return score;
  }
}
