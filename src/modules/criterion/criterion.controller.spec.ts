import { Test, TestingModule } from '@nestjs/testing';
import { CriterionController } from './criterion.controller';
import { CriterionService } from './criterion.service';
import { CreateCriterionDto } from './dto/create-criterion.dto';
import { UpdateCriterionDto } from './dto/update-criterion.dto';

describe('CriterionController', () => {
  let controller: CriterionController;
  const criterionService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CriterionController],
      providers: [{ provide: CriterionService, useValue: criterionService }],
    }).compile();

    controller = module.get<CriterionController>(CriterionController);
    jest.clearAllMocks();
  });

  it('creates criterion', () => {
    const dto: CreateCriterionDto = { name: 'Life', weight: 0.5, active: true };
    criterionService.create.mockReturnValue({ id: 'criterion-1', ...dto });

    const result = controller.create(dto);

    expect(result).toEqual({ id: 'criterion-1', ...dto });
    expect(criterionService.create).toHaveBeenCalledWith(dto);
  });

  it('updates criterion', () => {
    const dto: UpdateCriterionDto = { active: false };
    criterionService.update.mockReturnValue({ id: 'criterion-1', ...dto });

    const result = controller.update('criterion-1', dto);

    expect(result).toEqual({ id: 'criterion-1', ...dto });
    expect(criterionService.update).toHaveBeenCalledWith('criterion-1', dto);
  });
});
