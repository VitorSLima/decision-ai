import { DeleteScoreUseCase } from './delete-score.use-case';

const deleteScoreRepository = {
  delete: jest.fn(),
};

const findScoreUseCase = {
  execute: jest.fn(),
};

const logger = {
  log: jest.fn(),
};

describe('DeleteScoreUseCase', () => {
  let useCase: DeleteScoreUseCase;

  beforeEach(() => {
    useCase = new DeleteScoreUseCase(
      deleteScoreRepository as any,
      findScoreUseCase as any,
      logger as any,
    );
    jest.clearAllMocks();
  });

  it('deletes score after validating existence', async () => {
    findScoreUseCase.execute.mockResolvedValue({ id: 'score-1' });
    deleteScoreRepository.delete.mockResolvedValue(undefined);

    const result = await useCase.execute('score-1');

    expect(findScoreUseCase.execute).toHaveBeenCalledWith('score-1');
    expect(deleteScoreRepository.delete).toHaveBeenCalledWith('score-1');
    expect(logger.log).toHaveBeenCalledWith('Score removed: score-1');
    expect(result).toEqual({ id: 'score-1' });
  });

  it('propagates errors raised while validating the score', async () => {
    const error = new Error('not found');
    findScoreUseCase.execute.mockRejectedValue(error);

    await expect(useCase.execute('score-1')).rejects.toThrow(error);
    expect(deleteScoreRepository.delete).not.toHaveBeenCalled();
  });
});
