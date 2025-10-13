import { Test, TestingModule } from '@nestjs/testing';
import { ScoreService } from './score.service';
import { CreateScoreUseCase, DeleteScoreUseCase } from './use-cases';
import { CreateScoreDto } from './dto/create-score.dto';

describe('ScoreService', () => {
  let service: ScoreService;
  const createScoreUseCase = { execute: jest.fn() };
  const deleteScoreUseCase = { execute: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScoreService,
        { provide: CreateScoreUseCase, useValue: createScoreUseCase },
        { provide: DeleteScoreUseCase, useValue: deleteScoreUseCase },
      ],
    }).compile();

    service = module.get<ScoreService>(ScoreService);
    jest.clearAllMocks();
  });

  it('creates score link', async () => {
    const dto: CreateScoreDto = { optionId: 'option-1', criterionId: 'criterion-1' };
    const expected = { id: 'score-1', ...dto };
    createScoreUseCase.execute.mockResolvedValue(expected);

    const result = await service.create(dto);

    expect(result).toEqual(expected);
    expect(createScoreUseCase.execute).toHaveBeenCalledWith(dto);
  });

  it('removes score link', async () => {
    deleteScoreUseCase.execute.mockResolvedValue({ id: 'score-1' });

    const result = await service.remove('score-1');

    expect(result).toEqual({ id: 'score-1' });
    expect(deleteScoreUseCase.execute).toHaveBeenCalledWith('score-1');
  });
});
