import { NotFoundException } from '@nestjs/common';
import { FindOptionUseCase } from './find-option.use-case';

const findOptionRepository = {
  findById: jest.fn(),
};

const logger = {
  log: jest.fn(),
  warn: jest.fn(),
};

describe('FindOptionUseCase', () => {
  let useCase: FindOptionUseCase;

  beforeEach(() => {
    useCase = new FindOptionUseCase(
      findOptionRepository as any,
      logger as any,
    );
    jest.clearAllMocks();
  });

  it('returns the option and logs when found', async () => {
    const option = { id: 'option-1', name: 'Option' };
    findOptionRepository.findById.mockResolvedValue(option);

    const result = await useCase.execute('option-1');

    expect(result).toEqual(option);
    expect(logger.log).toHaveBeenCalledWith('Option loaded: Option');
  });

  it('throws NotFoundException when option is missing', async () => {
    findOptionRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute('option-2')).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(logger.warn).toHaveBeenCalledWith('Option not found: option-2');
  });
});
