import { Injectable, Logger } from '@nestjs/common';
import { DeleteOptionRepository } from '../repository';
import { FindOptionUseCase } from './find-option.use-case';

@Injectable()
export class DeleteOptionUseCase {
  constructor(
    private readonly deleteOptionRepository: DeleteOptionRepository,
    private readonly findOptionUseCase: FindOptionUseCase,
    private readonly logger: Logger,
  ) {}

  async execute(id: string) {
    const option = await this.findOptionUseCase.execute(id);
    await this.deleteOptionRepository.delete(id);
    this.logger.log(`Option removed: ${option.name}`);
    return { id };
  }
}
