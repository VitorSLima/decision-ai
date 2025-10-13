import { Injectable } from '@nestjs/common';
import { CreateCriterionDto } from './dto/create-criterion.dto';
import { UpdateCriterionDto } from './dto/update-criterion.dto';
import {
  CreateCriterionUseCase,
  DeleteCriterionUseCase,
  FindCriterionUseCase,
  ListCriteriaUseCase,
  UpdateCriterionUseCase,
} from './use-cases';

@Injectable()
export class CriterionService {
  constructor(
    private readonly createCriterionUseCase: CreateCriterionUseCase,
    private readonly listCriteriaUseCase: ListCriteriaUseCase,
    private readonly findCriterionUseCase: FindCriterionUseCase,
    private readonly updateCriterionUseCase: UpdateCriterionUseCase,
    private readonly deleteCriterionUseCase: DeleteCriterionUseCase,
  ) {}

  create(data: CreateCriterionDto) {
    return this.createCriterionUseCase.execute(data);
  }

  findAll() {
    return this.listCriteriaUseCase.execute();
  }

  findOne(id: string) {
    return this.findCriterionUseCase.execute(id);
  }

  update(id: string, data: UpdateCriterionDto) {
    return this.updateCriterionUseCase.execute(id, data);
  }

  remove(id: string) {
    return this.deleteCriterionUseCase.execute(id);
  }
}
