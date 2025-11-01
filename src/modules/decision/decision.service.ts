import { Injectable } from '@nestjs/common';
import { DecideDto } from './dto/decide.dto';
import { DecideScenarioUseCase, ListDecisionsUseCase } from './use-cases';

@Injectable()
export class DecisionService {
  constructor(
    private readonly decideScenarioUseCase: DecideScenarioUseCase,
    private readonly listDecisionsUseCase: ListDecisionsUseCase,
  ) {}

  decide(data: DecideDto) {
    return this.decideScenarioUseCase.execute(data.scenarioId);
  }

  list() {
    return this.listDecisionsUseCase.execute();
  }
}
