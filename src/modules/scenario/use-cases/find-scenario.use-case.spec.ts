import { NotFoundException } from '@nestjs/common';
import { FindScenarioUseCase } from './find-scenario.use-case';

const findScenarioRepository = {
  findById: jest.fn(),
};

const logger = {
  log: jest.fn(),
  warn: jest.fn(),
};

describe('FindScenarioUseCase', () => {
  let useCase: FindScenarioUseCase;

  beforeEach(() => {
    useCase = new FindScenarioUseCase(
      findScenarioRepository as any,
      logger as any,
    );
    jest.clearAllMocks();
  });

  it('returns the scenario when found', async () => {
    const scenario = { id: 'scenario-1', title: 'Scenario' };
    findScenarioRepository.findById.mockResolvedValue(scenario);

    const result = await useCase.execute('scenario-1');

    expect(result).toEqual(scenario);
    expect(logger.log).toHaveBeenCalledWith('Scenario loaded: Scenario');
  });

  it('throws NotFoundException when scenario is missing', async () => {
    findScenarioRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute('scenario-2')).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(logger.warn).toHaveBeenCalledWith('Scenario not found: scenario-2');
  });
});
