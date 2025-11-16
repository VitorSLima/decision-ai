import { DeleteCriterionUseCase } from './delete-criterion.use-case';

const deleteCriterionRepository = {
  delete: jest.fn(),
};

const findCriterionUseCase = {
  execute: jest.fn(),
};

const logger = {
  log: jest.fn(),
};

describe('DeleteCriterionUseCase', () => {
  let useCase: DeleteCriterionUseCase;

  beforeEach(() => {
    useCase = new DeleteCriterionUseCase(
      deleteCriterionRepository as any,
      findCriterionUseCase as any,
      logger as any,
    );
    jest.clearAllMocks();
  });

  it('confirms existence, deletes and logs the criterion', async () => {
    findCriterionUseCase.execute.mockResolvedValue({
      id: 'criterion-1',
      name: 'Criterion',
    });

    const result = await useCase.execute('criterion-1');

    expect(findCriterionUseCase.execute).toHaveBeenCalledWith('criterion-1');
    expect(deleteCriterionRepository.delete).toHaveBeenCalledWith('criterion-1');
    expect(logger.log).toHaveBeenCalledWith('Criterion removed: Criterion');
    expect(result).toEqual({ id: 'criterion-1' });
  });

  it('avoids deletion when the criterion cannot be loaded', async () => {
    const error = new Error('missing');
    findCriterionUseCase.execute.mockRejectedValue(error);

    await expect(useCase.execute('criterion-2')).rejects.toThrow(error);
    expect(deleteCriterionRepository.delete).not.toHaveBeenCalled();
  });
});
