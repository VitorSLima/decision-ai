import { NotFoundException } from '@nestjs/common';
import { FindCriterionUseCase } from './find-criterion.use-case';

const findCriterionRepository = {
  findById: jest.fn(),
};

const logger = {
  log: jest.fn(),
  warn: jest.fn(),
};

describe('FindCriterionUseCase', () => {
  let useCase: FindCriterionUseCase;

  beforeEach(() => {
    useCase = new FindCriterionUseCase(
      findCriterionRepository as any,
      logger as any,
    );
    jest.clearAllMocks();
  });

  it('returns the criterion when available', async () => {
    const criterion = { id: 'criterion-1', name: 'Criterion' };
    findCriterionRepository.findById.mockResolvedValue(criterion);

    const result = await useCase.execute('criterion-1');

    expect(result).toEqual(criterion);
    expect(logger.log).toHaveBeenCalledWith('Criterion loaded: Criterion');
  });

  it('throws NotFoundException otherwise', async () => {
    findCriterionRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute('criterion-2')).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(logger.warn).toHaveBeenCalledWith('Criterion not found: criterion-2');
  });
});
