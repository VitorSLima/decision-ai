import { ListOptionsByScenarioUseCase } from './list-options-by-scenario.use-case';

const listOptionByScenarioRepository = {
  list: jest.fn(),
};

const logger = {
  log: jest.fn(),
};

describe('ListOptionsByScenarioUseCase', () => {
  let useCase: ListOptionsByScenarioUseCase;

  beforeEach(() => {
    useCase = new ListOptionsByScenarioUseCase(
      listOptionByScenarioRepository as any,
      logger as any,
    );
    jest.clearAllMocks();
  });

  it('lists options for a scenario and logs the count', async () => {
    listOptionByScenarioRepository.list.mockResolvedValue([
      { id: 'option-1' },
      { id: 'option-2' },
    ]);

    const result = await useCase.execute('scenario-1');

    expect(listOptionByScenarioRepository.list).toHaveBeenCalledWith('scenario-1');
    expect(logger.log).toHaveBeenCalledWith(
      'Listed 2 options for scenario scenario-1',
    );
    expect(result).toHaveLength(2);
  });
});
