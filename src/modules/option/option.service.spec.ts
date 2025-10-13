import { Test, TestingModule } from '@nestjs/testing';
import { OptionService } from './option.service';
import {
  CreateOptionUseCase,
  DeleteOptionUseCase,
  FindOptionUseCase,
  ListOptionsByScenarioUseCase,
  UpdateOptionUseCase,
} from './use-cases';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';

describe('OptionService', () => {
  let service: OptionService;
  const createOptionUseCase = { execute: jest.fn() };
  const listOptionsByScenarioUseCase = { execute: jest.fn() };
  const findOptionUseCase = { execute: jest.fn() };
  const updateOptionUseCase = { execute: jest.fn() };
  const deleteOptionUseCase = { execute: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OptionService,
        { provide: CreateOptionUseCase, useValue: createOptionUseCase },
        {
          provide: ListOptionsByScenarioUseCase,
          useValue: listOptionsByScenarioUseCase,
        },
        { provide: FindOptionUseCase, useValue: findOptionUseCase },
        { provide: UpdateOptionUseCase, useValue: updateOptionUseCase },
        { provide: DeleteOptionUseCase, useValue: deleteOptionUseCase },
      ],
    }).compile();

    service = module.get<OptionService>(OptionService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create option for scenario', async () => {
    const dto: CreateOptionDto = { name: 'Option A', description: 'Desc' };
    const expected = { id: '1', ...dto };
    createOptionUseCase.execute.mockResolvedValue(expected);

    const result = await service.create('scenario-1', dto);

    expect(result).toEqual(expected);
    expect(createOptionUseCase.execute).toHaveBeenCalledWith('scenario-1', dto);
  });

  it('should list options by scenario', async () => {
    const options = [{ id: '1', name: 'Option' }];
    listOptionsByScenarioUseCase.execute.mockResolvedValue(options);

    const result = await service.findByScenario('scenario-1');

    expect(result).toEqual(options);
    expect(listOptionsByScenarioUseCase.execute).toHaveBeenCalledWith('scenario-1');
  });

  it('should find option by id', async () => {
    const option = { id: '1', name: 'Option' };
    findOptionUseCase.execute.mockResolvedValue(option);

    const result = await service.findOne('1');

    expect(result).toEqual(option);
    expect(findOptionUseCase.execute).toHaveBeenCalledWith('1');
  });

  it('should update option', async () => {
    const dto: UpdateOptionDto = { name: 'Updated' };
    const option = { id: '1', name: 'Updated' };
    updateOptionUseCase.execute.mockResolvedValue(option);

    const result = await service.update('1', dto);

    expect(result).toEqual(option);
    expect(updateOptionUseCase.execute).toHaveBeenCalledWith('1', dto);
  });

  it('should delete option', async () => {
    const response = { id: '1' };
    deleteOptionUseCase.execute.mockResolvedValue(response);

    const result = await service.remove('1');

    expect(result).toEqual(response);
    expect(deleteOptionUseCase.execute).toHaveBeenCalledWith('1');
  });
});
