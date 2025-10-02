import { UpdateScenarioUseCase } from './update-scenario.use-case';

const updateScenarioRepository = {
  update: jest.fn(),
};

const findScenarioUseCase = {
  execute: jest.fn(),
};

const logger = {
  log: jest.fn(),
};

describe('UpdateScenarioUseCase', () => {
  let useCase: UpdateScenarioUseCase;

  beforeEach(() => {
    useCase = new UpdateScenarioUseCase(
      updateScenarioRepository as any,
      findScenarioUseCase as any,
      logger as any,
    );
    jest.clearAllMocks();
  });

  it('validates, updates and logs the scenario', async () => {
    findScenarioUseCase.execute.mockResolvedValue({ id: 'scenario-1' });
    const updated = { id: 'scenario-1', title: 'Updated' };
    updateScenarioRepository.update.mockResolvedValue(updated);

    const result = await useCase.execute('scenario-1', { title: 'Updated' } as any);

    expect(findScenarioUseCase.execute).toHaveBeenCalledWith('scenario-1');
    expect(updateScenarioRepository.update).toHaveBeenCalledWith('scenario-1', {
      title: 'Updated',
    });
    expect(logger.log).toHaveBeenCalledWith('Scenario updated: Updated');
    expect(result).toEqual(updated);
  });
});
