import { Injectable } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import {
  CreateOptionUseCase,
  DeleteOptionUseCase,
  FindOptionUseCase,
  ListOptionsByScenarioUseCase,
  UpdateOptionUseCase,
} from './use-cases';

@Injectable()
export class OptionService {
  constructor(
    private readonly createOptionUseCase: CreateOptionUseCase,
    private readonly listOptionsByScenarioUseCase: ListOptionsByScenarioUseCase,
    private readonly findOptionUseCase: FindOptionUseCase,
    private readonly updateOptionUseCase: UpdateOptionUseCase,
    private readonly deleteOptionUseCase: DeleteOptionUseCase,
  ) {}

  create(scenarioId: string, createOptionDto: CreateOptionDto) {
    return this.createOptionUseCase.execute(scenarioId, createOptionDto);
  }

  findByScenario(scenarioId: string) {
    return this.listOptionsByScenarioUseCase.execute(scenarioId);
  }

  findOne(id: string) {
    return this.findOptionUseCase.execute(id);
  }

  update(id: string, updateOptionDto: UpdateOptionDto) {
    return this.updateOptionUseCase.execute(id, updateOptionDto);
  }

  remove(id: string) {
    return this.deleteOptionUseCase.execute(id);
  }
}
