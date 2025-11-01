import { ListDecisionsUseCase } from './list-decisions.use-case';

const decisionRepository = {
  listScenariosWithOptions: jest.fn(),
};

const logger = {
  log: jest.fn(),
};

describe('ListDecisionsUseCase', () => {
  let useCase: ListDecisionsUseCase;

  beforeEach(() => {
    useCase = new ListDecisionsUseCase(
      decisionRepository as any,
      logger as any,
    );
    jest.clearAllMocks();
  });

  it('computes decision list for every scenario', async () => {
    decisionRepository.listScenariosWithOptions.mockResolvedValue([
      {
        id: 'scenario-1',
        title: 'Scenario One',
        description: 'Test',
        options: [
          {
            id: 'option-a',
            name: 'Option A',
            description: 'A',
            scores: [
              {
                criterion: {
                  id: 'c1',
                  name: 'Cost',
                  weight: 0.7,
                  active: true,
                },
              },
              {
                criterion: {
                  id: 'c2',
                  name: 'Risk',
                  weight: 0.3,
                  active: false,
                },
              },
            ],
          },
          {
            id: 'option-b',
            name: 'Option B',
            description: 'B',
            scores: [
              {
                criterion: {
                  id: 'c2',
                  name: 'Risk',
                  weight: 0.3,
                  active: true,
                },
              },
            ],
          },
        ],
      },
    ]);

    const result = await useCase.execute();

    expect(result).toHaveLength(1);
    expect(result[0].bestOptions[0]).toMatchObject({
      id: 'option-a',
      totalScore: 0.7,
    });
    expect(logger.log).toHaveBeenCalledWith(
      'Decision list computed with 1 items',
    );
  });
});
