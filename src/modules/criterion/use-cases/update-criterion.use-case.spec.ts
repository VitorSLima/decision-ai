import { UpdateCriterionUseCase } from './update-criterion.use-case';

const updateCriterionRepository = {
  update: jest.fn(),
};

const findCriterionUseCase = {
  execute: jest.fn(),
};

const logger = {
  log: jest.fn(),
};

describe('UpdateCriterionUseCase', () => {
  let useCase: UpdateCriterionUseCase;

  beforeEach(() => {
    useCase = new UpdateCriterionUseCase(
      updateCriterionRepository as any,
      findCriterionUseCase as any,
      logger as any,
    );
    jest.clearAllMocks();
  });

  it('validates criterion, updates it and logs the result', async () => {
    findCriterionUseCase.execute.mockResolvedValue({ id: 'criterion-1' });
    const updated = { id: 'criterion-1', name: 'Updated' };
    updateCriterionRepository.update.mockResolvedValue(updated);

    const result = await useCase.execute('criterion-1', { name: 'Updated' } as any);

    expect(findCriterionUseCase.execute).toHaveBeenCalledWith('criterion-1');
    expect(updateCriterionRepository.update).toHaveBeenCalledWith('criterion-1', {
      name: 'Updated',
    });
    expect(logger.log).toHaveBeenCalledWith('Criterion updated: Updated');
    expect(result).toEqual(updated);
  });
});
