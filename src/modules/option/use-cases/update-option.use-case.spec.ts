import { UpdateOptionUseCase } from './update-option.use-case';

const updateOptionRepository = {
  update: jest.fn(),
};

const findOptionUseCase = {
  execute: jest.fn(),
};

const logger = {
  log: jest.fn(),
};

describe('UpdateOptionUseCase', () => {
  let useCase: UpdateOptionUseCase;

  beforeEach(() => {
    useCase = new UpdateOptionUseCase(
      updateOptionRepository as any,
      findOptionUseCase as any,
      logger as any,
    );
    jest.clearAllMocks();
  });

  it('requires option existence, updates and logs result', async () => {
    findOptionUseCase.execute.mockResolvedValue({ id: 'option-1' });
    const updated = { id: 'option-1', name: 'Updated' };
    updateOptionRepository.update.mockResolvedValue(updated);

    const result = await useCase.execute('option-1', { name: 'Updated' } as any);

    expect(findOptionUseCase.execute).toHaveBeenCalledWith('option-1');
    expect(updateOptionRepository.update).toHaveBeenCalledWith('option-1', {
      name: 'Updated',
    });
    expect(logger.log).toHaveBeenCalledWith('Option updated: Updated');
    expect(result).toEqual(updated);
  });
});
