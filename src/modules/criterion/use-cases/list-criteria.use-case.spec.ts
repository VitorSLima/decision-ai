import { ListCriteriaUseCase } from './list-criteria.use-case';

const listCriterionRepository = {
  list: jest.fn(),
};

const logger = {
  log: jest.fn(),
};

describe('ListCriteriaUseCase', () => {
  let useCase: ListCriteriaUseCase;

  beforeEach(() => {
    useCase = new ListCriteriaUseCase(
      listCriterionRepository as any,
      logger as any,
    );
    jest.clearAllMocks();
  });

  it('returns every criterion and logs the count', async () => {
    listCriterionRepository.list.mockResolvedValue([
      { id: 'criterion-1' },
      { id: 'criterion-2' },
    ]);

    const result = await useCase.execute();

    expect(result).toHaveLength(2);
    expect(listCriterionRepository.list).toHaveBeenCalled();
    expect(logger.log).toHaveBeenCalledWith('Listed 2 criteria');
  });
});
