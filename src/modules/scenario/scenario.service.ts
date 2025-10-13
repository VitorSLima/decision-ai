import { Injectable } from '@nestjs/common';
import { CreateScenarioDto } from './dto/create-scenario.dto';
import { UpdateScenarioDto } from './dto/update-scenario.dto';
import {
  CreateScenarioUseCase,
  DeleteScenarioUseCase,
  FindScenarioUseCase,
  ListScenarioUseCase,
  UpdateScenarioUseCase,
} from './use-cases';

@Injectable()
export class ScenarioService {
  constructor(
    private readonly createScenarioUseCase: CreateScenarioUseCase,
    private readonly listScenarioUseCase: ListScenarioUseCase,
    private readonly findScenarioUseCase: FindScenarioUseCase,
    private readonly updateScenarioUseCase: UpdateScenarioUseCase,
    private readonly deleteScenarioUseCase: DeleteScenarioUseCase,
  ) {}

  create(data: CreateScenarioDto) {
    return this.createScenarioUseCase.execute(data);
  }

  findAll() {
    return this.listScenarioUseCase.execute();
  }

  findOne(id: string) {
    return this.findScenarioUseCase.execute(id);
  }

  update(id: string, updateScenarioDto: UpdateScenarioDto) {
    return this.updateScenarioUseCase.execute(id, updateScenarioDto);
  }

  remove(id: string) {
    return this.deleteScenarioUseCase.execute(id);
  }
}
