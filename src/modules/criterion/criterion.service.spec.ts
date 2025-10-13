import { Test, TestingModule } from '@nestjs/testing';
import { CriterionService } from './criterion.service';
import {
  CreateCriterionUseCase,
  DeleteCriterionUseCase,
  FindCriterionUseCase,
  ListCriteriaUseCase,
  UpdateCriterionUseCase,
} from './use-cases';
import { CreateCriterionDto } from './dto/create-criterion.dto';
import { UpdateCriterionDto } from './dto/update-criterion.dto';

describe('CriterionService', () => {
  let service: CriterionService;
  const createCriterionUseCase = { execute: jest.fn() };
  const listCriteriaUseCase = { execute: jest.fn() };
  const findCriterionUseCase = { execute: jest.fn() };
  const updateCriterionUseCase = { execute: jest.fn() };
  const deleteCriterionUseCase = { execute: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CriterionService,
        { provide: CreateCriterionUseCase, useValue: createCriterionUseCase },
        { provide: ListCriteriaUseCase, useValue: listCriteriaUseCase },
        { provide: FindCriterionUseCase, useValue: findCriterionUseCase },
        { provide: UpdateCriterionUseCase, useValue: updateCriterionUseCase },
        { provide: DeleteCriterionUseCase, useValue: deleteCriterionUseCase },
      ],
    }).compile();

    service = module.get<CriterionService>(CriterionService);
    jest.clearAllMocks();
  });

  it('creates criterion', async () => {
    const dto: CreateCriterionDto = { name: 'Life', weight: 0.5, active: true };
    const expected = { id: 'criterion-1', ...dto };
    createCriterionUseCase.execute.mockResolvedValue(expected);

    const result = await service.create(dto);

    expect(result).toEqual(expected);
    expect(createCriterionUseCase.execute).toHaveBeenCalledWith(dto);
  });

  it('lists criteria', async () => {
    const criteria = [{ id: 'criterion-1', name: 'Life' }];
    listCriteriaUseCase.execute.mockResolvedValue(criteria);

    const result = await service.findAll();

    expect(result).toEqual(criteria);
    expect(listCriteriaUseCase.execute).toHaveBeenCalled();
  });

  it('finds criterion', async () => {
    const criterion = { id: 'criterion-1', name: 'Life' };
    findCriterionUseCase.execute.mockResolvedValue(criterion);

    const result = await service.findOne('criterion-1');

    expect(result).toEqual(criterion);
    expect(findCriterionUseCase.execute).toHaveBeenCalledWith('criterion-1');
  });

  it('updates criterion', async () => {
    const dto: UpdateCriterionDto = { active: false };
    const criterion = { id: 'criterion-1', active: false };
    updateCriterionUseCase.execute.mockResolvedValue(criterion);

    const result = await service.update('criterion-1', dto);

    expect(result).toEqual(criterion);
    expect(updateCriterionUseCase.execute).toHaveBeenCalledWith('criterion-1', dto);
  });

  it('deletes criterion', async () => {
    deleteCriterionUseCase.execute.mockResolvedValue({ id: 'criterion-1' });

    const result = await service.remove('criterion-1');

    expect(result).toEqual({ id: 'criterion-1' });
    expect(deleteCriterionUseCase.execute).toHaveBeenCalledWith('criterion-1');
  });
});
