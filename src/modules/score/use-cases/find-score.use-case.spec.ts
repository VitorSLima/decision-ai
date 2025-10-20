import { NotFoundException } from '@nestjs/common';
import { FindScoreUseCase } from './find-score.use-case';

const findScoreRepository = {
  findById: jest.fn(),
};

const logger = {
  log: jest.fn(),
  warn: jest.fn(),
};

describe('FindScoreUseCase', () => {
  let useCase: FindScoreUseCase;

  beforeEach(() => {
    useCase = new FindScoreUseCase(
      findScoreRepository as any,
      logger as any,
    );
    jest.clearAllMocks();
  });

  it('returns the score when it exists', async () => {
    const score = { id: 'score-1' };
    findScoreRepository.findById.mockResolvedValue(score);

    const result = await useCase.execute('score-1');

    expect(result).toEqual(score);
    expect(logger.log).toHaveBeenCalledWith('Score loaded: score-1');
  });

  it('throws NotFoundException when score does not exist', async () => {
    findScoreRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute('score-2')).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(logger.warn).toHaveBeenCalledWith('Score not found: score-2');
  });
});
