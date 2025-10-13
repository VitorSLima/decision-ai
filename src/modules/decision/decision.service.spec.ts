import { Test, TestingModule } from '@nestjs/testing';
import { DecisionService } from './decision.service';
import { DecideScenarioUseCase } from './use-cases';

describe('DecisionService', () => {
  let service: DecisionService;
  const decideScenarioUseCase = { execute: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DecisionService,
        { provide: DecideScenarioUseCase, useValue: decideScenarioUseCase },
      ],
    }).compile();

    service = module.get<DecisionService>(DecisionService);
    jest.clearAllMocks();
  });

  it('delegates decision to use case', async () => {
    const decision = { scenario: { id: 'scenario-1' }, bestOptions: [] };
    decideScenarioUseCase.execute.mockResolvedValue(decision);

    const result = await service.decide({ scenarioId: 'scenario-1' });

    expect(result).toEqual(decision);
    expect(decideScenarioUseCase.execute).toHaveBeenCalledWith('scenario-1');
  });
});
