import { ListScoresUseCase } from './list-scores.use-case';

const listScoreRepository = {
  list: jest.fn(),
};

const logger = {
  log: jest.fn(),
};

describe('ListScoresUseCase', () => {
  let useCase: ListScoresUseCase;

  beforeEach(() => {
    useCase = new ListScoresUseCase(
      listScoreRepository as any,
      logger as any,
    );
    jest.clearAllMocks();
  });

  it('lists every score with relations', async () => {
    listScoreRepository.list.mockResolvedValue([
      {
        id: 'score-1',
        option: { id: 'option-1', scenario: { id: 'scenario-1', title: 'Scenario' } },
        criterion: { id: 'criterion-1' },
      },
    ]);

    const result = await useCase.execute();

    expect(result).toHaveLength(1);
    expect(logger.log).toHaveBeenCalledWith('Listed 1 scores');
  });
});
