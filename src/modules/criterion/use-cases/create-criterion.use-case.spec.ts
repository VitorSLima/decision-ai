import { CreateCriterionUseCase } from './create-criterion.use-case';

const createCriterionRepository = {
  create: jest.fn(),
};

const logger = {
  log: jest.fn(),
};

describe('CreateCriterionUseCase', () => {
  let useCase: CreateCriterionUseCase;

  beforeEach(() => {
    useCase = new CreateCriterionUseCase(
      createCriterionRepository as any,
      logger as any,
    );
    jest.clearAllMocks();
  });

  it('persists and logs a criterion', async () => {
    const dto = { name: 'Criterion' } as any;
    const criterion = { id: 'criterion-1', ...dto };
    createCriterionRepository.create.mockResolvedValue(criterion);

    const result = await useCase.execute(dto);

    expect(result).toEqual(criterion);
    expect(createCriterionRepository.create).toHaveBeenCalledWith(dto);
    expect(logger.log).toHaveBeenCalledWith('Criterion created: Criterion');
  });
});
