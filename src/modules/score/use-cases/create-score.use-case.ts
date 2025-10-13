import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateScoreDto } from '../dto/create-score.dto';
import {
  CreateScoreRepository,
  FindScoreByLinkRepository,
} from '../repository';

@Injectable()
export class CreateScoreUseCase {
  constructor(
    private readonly createScoreRepository: CreateScoreRepository,
    private readonly findScoreByLinkRepository: FindScoreByLinkRepository,
    private readonly logger: Logger,
  ) {}

  async execute(data: CreateScoreDto) {
    const existing = await this.findScoreByLinkRepository.find(
      data.optionId,
      data.criterionId,
    );

    if (existing) {
      throw new ConflictException(
        'This option already satisfies the informed criterion',
      );
    }

    try {
      const score = await this.createScoreRepository.create(data);
      this.logger.log(
        `Score linked option ${score.optionId} and criterion ${score.criterionId}`,
      );
      return score;
    } catch (error) {
      if (error.code === 'P2003') {
        throw new NotFoundException(
          'Option or criterion not found for the provided identifiers',
        );
      }
      this.logger.error(error);
      throw error;
    }
  }
}
