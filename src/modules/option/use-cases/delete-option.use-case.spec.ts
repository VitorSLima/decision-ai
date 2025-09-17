import { DeleteOptionUseCase } from './delete-option.use-case';

const deleteOptionRepository = {
  delete: jest.fn(),
};

const findOptionUseCase = {
  execute: jest.fn(),
};

const logger = {
  log: jest.fn(),
};

describe('DeleteOptionUseCase', () => {
  let useCase: DeleteOptionUseCase;

  beforeEach(() => {
    useCase = new DeleteOptionUseCase(
      deleteOptionRepository as any,
      findOptionUseCase as any,
      logger as any,
    );
    jest.clearAllMocks();
  });

  it('ensures option exists, deletes and logs removal', async () => {
    findOptionUseCase.execute.mockResolvedValue({ id: 'option-1', name: 'Option' });
    deleteOptionRepository.delete.mockResolvedValue(undefined);

    const result = await useCase.execute('option-1');

    expect(findOptionUseCase.execute).toHaveBeenCalledWith('option-1');
    expect(deleteOptionRepository.delete).toHaveBeenCalledWith('option-1');
    expect(logger.log).toHaveBeenCalledWith('Option removed: Option');
    expect(result).toEqual({ id: 'option-1' });
  });

  it('does not delete when validation fails', async () => {
    const error = new Error('missing');
    findOptionUseCase.execute.mockRejectedValue(error);

    await expect(useCase.execute('option-1')).rejects.toThrow(error);
    expect(deleteOptionRepository.delete).not.toHaveBeenCalled();
  });
});
