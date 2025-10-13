import { Test, TestingModule } from '@nestjs/testing';
import { ScenarioService } from './scenario.service';
import {
  CreateScenarioUseCase,
  DeleteScenarioUseCase,
  FindScenarioUseCase,
  ListScenarioUseCase,
  UpdateScenarioUseCase,
} from './use-cases';
import { CreateScenarioDto } from './dto/create-scenario.dto';
import { UpdateScenarioDto } from './dto/update-scenario.dto';

describe('ScenarioService', () => {
  let service: ScenarioService;
  const createScenarioUseCase = { execute: jest.fn() };
  const listScenarioUseCase = { execute: jest.fn() };
  const findScenarioUseCase = { execute: jest.fn() };
  const updateScenarioUseCase = { execute: jest.fn() };
  const deleteScenarioUseCase = { execute: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScenarioService,
        { provide: CreateScenarioUseCase, useValue: createScenarioUseCase },
        { provide: ListScenarioUseCase, useValue: listScenarioUseCase },
        { provide: FindScenarioUseCase, useValue: findScenarioUseCase },
        { provide: UpdateScenarioUseCase, useValue: updateScenarioUseCase },
        { provide: DeleteScenarioUseCase, useValue: deleteScenarioUseCase },
      ],
    }).compile();

    service = module.get<ScenarioService>(ScenarioService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should delegate scenario creation to use case', async () => {
    const dto: CreateScenarioDto = { title: 'Test scenario', description: 'Desc' };
    const expected = { id: '1', ...dto };
    createScenarioUseCase.execute.mockResolvedValue(expected);

    const result = await service.create(dto);

    expect(result).toEqual(expected);
    expect(createScenarioUseCase.execute).toHaveBeenCalledWith(dto);
  });

  it('should list scenarios', async () => {
    const scenarios = [{ id: '1', title: 'Scenario', options: [] }];
    listScenarioUseCase.execute.mockResolvedValue(scenarios);

    const result = await service.findAll();

    expect(result).toEqual(scenarios);
    expect(listScenarioUseCase.execute).toHaveBeenCalled();
  });

  it('should find scenario by id', async () => {
    const scenario = { id: '1', title: 'Scenario' };
    findScenarioUseCase.execute.mockResolvedValue(scenario);

    const result = await service.findOne('1');

    expect(result).toEqual(scenario);
    expect(findScenarioUseCase.execute).toHaveBeenCalledWith('1');
  });

  it('should update scenario', async () => {
    const dto: UpdateScenarioDto = { title: 'Updated' };
    const scenario = { id: '1', title: 'Updated' };
    updateScenarioUseCase.execute.mockResolvedValue(scenario);

    const result = await service.update('1', dto);

    expect(result).toEqual(scenario);
    expect(updateScenarioUseCase.execute).toHaveBeenCalledWith('1', dto);
  });

  it('should delete scenario', async () => {
    const response = { id: '1' };
    deleteScenarioUseCase.execute.mockResolvedValue(response);

    const result = await service.remove('1');

    expect(result).toEqual(response);
    expect(deleteScenarioUseCase.execute).toHaveBeenCalledWith('1');
  });
});
