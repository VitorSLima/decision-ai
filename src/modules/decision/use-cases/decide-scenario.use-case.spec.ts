import { NotFoundException } from '@nestjs/common';
import { DecideScenarioUseCase } from './decide-scenario.use-case';

const decisionRepository = {
  getScenarioWithOptions: jest.fn(),
};

const logger = {
  log: jest.fn(),
  warn: jest.fn(),
};

describe('DecideScenarioUseCase', () => {
  let useCase: DecideScenarioUseCase;

  beforeEach(() => {
    useCase = new DecideScenarioUseCase(decisionRepository as any, logger as any);
    jest.clearAllMocks();
  });

  it('throws when scenario is missing', async () => {
    decisionRepository.getScenarioWithOptions.mockResolvedValue(null);

    await expect(useCase.execute('missing')).rejects.toBeInstanceOf(NotFoundException);
    expect(logger.warn).toHaveBeenCalled();
  });

  it('computes decision using active criteria weights', async () => {
    decisionRepository.getScenarioWithOptions.mockResolvedValue({
      id: 'scenario-1',
      title: 'Scenario',
      description: 'Test',
      options: [
        {
          id: 'option-a',
          name: 'Option A',
          description: 'A',
          scores: [
            {
              criterion: { id: 'c1', name: 'Life', weight: 0.6, active: true },
            },
            {
              criterion: { id: 'c2', name: 'Law', weight: 0.4, active: false },
            },
          ],
        },
        {
          id: 'option-b',
          name: 'Option B',
          description: 'B',
          scores: [
            {
              criterion: { id: 'c2', name: 'Law', weight: 0.4, active: true },
            },
          ],
        },
      ],
    });

    const result = await useCase.execute('scenario-1');

    expect(result.bestOptions[0]).toMatchObject({ id: 'option-a', totalScore: 0.6 });
    expect(result.options[1]).toMatchObject({ id: 'option-b', totalScore: 0.4 });
    expect(logger.log).toHaveBeenCalled();
  });
});
