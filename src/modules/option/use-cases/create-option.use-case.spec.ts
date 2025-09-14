import { NotFoundException } from '@nestjs/common';
import { CreateOptionUseCase } from './create-option.use-case';

const createOptionRepository = {
  create: jest.fn(),
};

const logger = {
  log: jest.fn(),
  error: jest.fn(),
};

describe('CreateOptionUseCase', () => {
  let useCase: CreateOptionUseCase;

  beforeEach(() => {
    useCase = new CreateOptionUseCase(
      createOptionRepository as any,
      logger as any,
    );
    jest.clearAllMocks();
  });

  it('creates a new option tied to a scenario', async () => {
    const dto = { name: 'Option' } as any;
    const option = { id: 'option-1', ...dto };
    createOptionRepository.create.mockResolvedValue(option);

    const result = await useCase.execute('scenario-1', dto);

    expect(result).toEqual(option);
    expect(createOptionRepository.create).toHaveBeenCalledWith('scenario-1', dto);
    expect(logger.log).toHaveBeenCalledWith(
      'Option created for scenario scenario-1: Option',
    );
  });

  it('throws NotFoundException when scenario does not exist', async () => {
    createOptionRepository.create.mockRejectedValue({ code: 'P2003' });

    await expect(
      useCase.execute('scenario-2', { name: 'Option' } as any),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('logs and rethrows unexpected errors', async () => {
    const error = new Error('db');
    createOptionRepository.create.mockRejectedValue(error);

    await expect(
      useCase.execute('scenario-1', { name: 'Option' } as any),
    ).rejects.toThrow(error);
    expect(logger.error).toHaveBeenCalledWith(error);
  });
});
