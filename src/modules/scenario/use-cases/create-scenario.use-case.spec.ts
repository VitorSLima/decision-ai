import { CreateScenarioUseCase } from './create-scenario.use-case';

const createScenarioRepository = {
  create: jest.fn(),
};

const logger = {
  log: jest.fn(),
  error: jest.fn(),
};

describe('CreateScenarioUseCase', () => {
  let useCase: CreateScenarioUseCase;

  beforeEach(() => {
    useCase = new CreateScenarioUseCase(
      createScenarioRepository as any,
      logger as any,
    );
    jest.clearAllMocks();
  });

  it('creates a scenario and logs the event', async () => {
    const dto = { title: 'Scenario', description: 'Desc' } as any;
    const scenario = { id: 'scenario-1', ...dto };
    createScenarioRepository.create.mockResolvedValue(scenario);

    const result = await useCase.execute(dto);

    expect(result).toEqual(scenario);
    expect(createScenarioRepository.create).toHaveBeenCalledWith(dto);
    expect(logger.log).toHaveBeenCalledWith('Scenario created: Scenario');
  });

  it('logs and rethrows errors raised by repository', async () => {
    const dto = { title: 'Scenario' } as any;
    const error = new Error('db');
    createScenarioRepository.create.mockRejectedValue(error);

    await expect(useCase.execute(dto)).rejects.toThrow(error);
    expect(logger.error).toHaveBeenCalledWith(error);
  });
});
