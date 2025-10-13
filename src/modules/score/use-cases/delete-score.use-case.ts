import { Injectable, Logger } from '@nestjs/common';
import { DeleteScoreRepository } from '../repository';
import { FindScoreUseCase } from './find-score.use-case';

@Injectable()
export class DeleteScoreUseCase {
  constructor(
    private readonly deleteScoreRepository: DeleteScoreRepository,
    private readonly findScoreUseCase: FindScoreUseCase,
    private readonly logger: Logger,
  ) {}

  async execute(id: string) {
    await this.findScoreUseCase.execute(id);
    await this.deleteScoreRepository.delete(id);
    this.logger.log(`Score removed: ${id}`);
    return { id };
  }
}
