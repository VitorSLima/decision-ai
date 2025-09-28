import { ListScenarioUseCase } from './list-scenario.use-case';

const listScenarioRepository = {
  list: jest.fn(),
};

const logger = {
  log: jest.fn(),
};

describe('ListScenarioUseCase', () => {
  let useCase: ListScenarioUseCase;

  beforeEach(() => {
    useCase = new ListScenarioUseCase(
      listScenarioRepository as any,
      logger as any,
    );
    jest.clearAllMocks();
  });

  it('lists scenarios and logs the count', async () => {
    listScenarioRepository.list.mockResolvedValue([
      { id: 'scenario-1' },
      { id: 'scenario-2' },
    ]);

    const result = await useCase.execute();

    expect(result).toHaveLength(2);
    expect(listScenarioRepository.list).toHaveBeenCalled();
    expect(logger.log).toHaveBeenCalledWith('Listed 2 scenarios');
  });
});
