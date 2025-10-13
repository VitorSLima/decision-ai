import { Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { CreateScoreUseCase, DeleteScoreUseCase } from './use-cases';

@Injectable()
export class ScoreService {
  constructor(
    private readonly createScoreUseCase: CreateScoreUseCase,
    private readonly deleteScoreUseCase: DeleteScoreUseCase,
  ) {}

  create(data: CreateScoreDto) {
    return this.createScoreUseCase.execute(data);
  }

  remove(id: string) {
    return this.deleteScoreUseCase.execute(id);
  }
}
