import { Test, TestingModule } from '@nestjs/testing';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';
import { CreateScoreDto } from './dto/create-score.dto';

describe('ScoreController', () => {
  let controller: ScoreController;
  const scoreService = {
    create: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScoreController],
      providers: [{ provide: ScoreService, useValue: scoreService }],
    }).compile();

    controller = module.get<ScoreController>(ScoreController);
    jest.clearAllMocks();
  });

  it('creates score link', () => {
    const dto: CreateScoreDto = { optionId: 'option-1', criterionId: 'criterion-1' };
    scoreService.create.mockReturnValue({ id: 'score-1', ...dto });

    const result = controller.create(dto);

    expect(result).toEqual({ id: 'score-1', ...dto });
    expect(scoreService.create).toHaveBeenCalledWith(dto);
  });

  it('removes score link', () => {
    scoreService.remove.mockReturnValue({ id: 'score-1' });

    const result = controller.remove('score-1');

    expect(result).toEqual({ id: 'score-1' });
    expect(scoreService.remove).toHaveBeenCalledWith('score-1');
  });
});
