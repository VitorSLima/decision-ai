import { DeleteScenarioUseCase } from './delete-scenario.use-case';

const deleteScenarioRepository = {
  delete: jest.fn(),
};

const findScenarioUseCase = {
  execute: jest.fn(),
};

const logger = {
  log: jest.fn(),
};

describe('DeleteScenarioUseCase', () => {
  let useCase: DeleteScenarioUseCase;

  beforeEach(() => {
    useCase = new DeleteScenarioUseCase(
      deleteScenarioRepository as any,
      findScenarioUseCase as any,
      logger as any,
    );
    jest.clearAllMocks();
  });

  it('ensures scenario exists, deletes and logs the removal', async () => {
    findScenarioUseCase.execute.mockResolvedValue({ id: 'scenario-1', title: 'Scenario' });
    deleteScenarioRepository.delete.mockResolvedValue(undefined);

    const result = await useCase.execute('scenario-1');

    expect(findScenarioUseCase.execute).toHaveBeenCalledWith('scenario-1');
    expect(deleteScenarioRepository.delete).toHaveBeenCalledWith('scenario-1');
    expect(logger.log).toHaveBeenCalledWith('Scenario removed: Scenario');
    expect(result).toEqual({ id: 'scenario-1' });
  });

  it('stops deletion when scenario validation fails', async () => {
    const error = new Error('not found');
    findScenarioUseCase.execute.mockRejectedValue(error);

    await expect(useCase.execute('scenario-1')).rejects.toThrow(error);
    expect(deleteScenarioRepository.delete).not.toHaveBeenCalled();
  });
});
