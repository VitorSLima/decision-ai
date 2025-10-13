import { Test, TestingModule } from '@nestjs/testing';
import { DecisionController } from './decision.controller';
import { DecisionService } from './decision.service';

describe('DecisionController', () => {
  let controller: DecisionController;
  const decisionService = {
    decide: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DecisionController],
      providers: [{ provide: DecisionService, useValue: decisionService }],
    }).compile();

    controller = module.get<DecisionController>(DecisionController);
    jest.clearAllMocks();
  });

  it('returns decision result', () => {
    const payload = { scenarioId: 'scenario-1' };
    decisionService.decide.mockReturnValue({ bestOptions: [] });

    const result = controller.decide(payload);

    expect(result).toEqual({ bestOptions: [] });
    expect(decisionService.decide).toHaveBeenCalledWith(payload);
  });
});
