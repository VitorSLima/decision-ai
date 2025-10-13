import { Test, TestingModule } from '@nestjs/testing';
import { ScenarioController } from './scenario.controller';
import { ScenarioService } from './scenario.service';
import { CreateScenarioDto } from './dto/create-scenario.dto';
import { UpdateScenarioDto } from './dto/update-scenario.dto';

describe('ScenarioController', () => {
  let controller: ScenarioController;
  const scenarioService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScenarioController],
      providers: [{ provide: ScenarioService, useValue: scenarioService }],
    }).compile();

    controller = module.get<ScenarioController>(ScenarioController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create scenario', () => {
    const dto: CreateScenarioDto = { title: 'Scenario', description: 'Desc' };
    scenarioService.create.mockReturnValue({ id: '1', ...dto });

    const result = controller.create(dto);

    expect(result).toEqual({ id: '1', ...dto });
    expect(scenarioService.create).toHaveBeenCalledWith(dto);
  });

  it('should update scenario', () => {
    const dto: UpdateScenarioDto = { title: 'Updated' };
    scenarioService.update.mockReturnValue({ id: '1', ...dto });

    const result = controller.update('1', dto);

    expect(result).toEqual({ id: '1', ...dto });
    expect(scenarioService.update).toHaveBeenCalledWith('1', dto);
  });
});
