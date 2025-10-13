import { Injectable } from '@nestjs/common';
import { DecideDto } from './dto/decide.dto';
import { DecideScenarioUseCase } from './use-cases';

@Injectable()
export class DecisionService {
  constructor(private readonly decideScenarioUseCase: DecideScenarioUseCase) {}

  decide(data: DecideDto) {
    return this.decideScenarioUseCase.execute(data.scenarioId);
  }
}
