import { Test, TestingModule } from '@nestjs/testing';
import { OptionController } from './option.controller';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';

describe('OptionController', () => {
  let controller: OptionController;
  const optionService = {
    create: jest.fn(),
    findByScenario: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OptionController],
      providers: [{ provide: OptionService, useValue: optionService }],
    }).compile();

    controller = module.get<OptionController>(OptionController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create option for scenario', () => {
    const dto: CreateOptionDto = { name: 'Option', description: 'Desc' };
    optionService.create.mockReturnValue({ id: '1', ...dto });

    const result = controller.create('scenario-1', dto);

    expect(result).toEqual({ id: '1', ...dto });
    expect(optionService.create).toHaveBeenCalledWith('scenario-1', dto);
  });

  it('should update option', () => {
    const dto: UpdateOptionDto = { name: 'Updated' };
    optionService.update.mockReturnValue({ id: '1', ...dto });

    const result = controller.update('1', dto);

    expect(result).toEqual({ id: '1', ...dto });
    expect(optionService.update).toHaveBeenCalledWith('1', dto);
  });
});
