import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateScoreUseCase } from './create-score.use-case';

const createRepository = {
  create: jest.fn(),
};

const findRepository = {
  find: jest.fn(),
};

const logger = {
  log: jest.fn(),
  error: jest.fn(),
};

describe('CreateScoreUseCase', () => {
  let useCase: CreateScoreUseCase;

  beforeEach(() => {
    useCase = new CreateScoreUseCase(
      createRepository as any,
      findRepository as any,
      logger as any,
    );
    jest.clearAllMocks();
  });

  it('throws conflict when score already exists', async () => {
    findRepository.find.mockResolvedValue({ id: 'existing' });

    await expect(
      useCase.execute({ optionId: 'option', criterionId: 'criterion' }),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('throws not found when foreign keys are missing', async () => {
    findRepository.find.mockResolvedValue(null);
    createRepository.create.mockRejectedValue({ code: 'P2003' });

    await expect(
      useCase.execute({ optionId: 'option', criterionId: 'criterion' }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('creates score when data is valid', async () => {
    const score = { id: 'score-1' };
    findRepository.find.mockResolvedValue(null);
    createRepository.create.mockResolvedValue(score);

    const result = await useCase.execute({
      optionId: 'option',
      criterionId: 'criterion',
    });

    expect(result).toEqual(score);
    expect(logger.log).toHaveBeenCalled();
  });
});
