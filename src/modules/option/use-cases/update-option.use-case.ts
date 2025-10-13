import { Injectable, Logger } from '@nestjs/common';
import { UpdateOptionDto } from '../dto/update-option.dto';
import { UpdateOptionRepository } from '../repository';
import { FindOptionUseCase } from './find-option.use-case';

@Injectable()
export class UpdateOptionUseCase {
  constructor(
    private readonly updateOptionRepository: UpdateOptionRepository,
    private readonly findOptionUseCase: FindOptionUseCase,
    private readonly logger: Logger,
  ) {}

  async execute(id: string, data: UpdateOptionDto) {
    await this.findOptionUseCase.execute(id);
    const option = await this.updateOptionRepository.update(id, data);
    this.logger.log(`Option updated: ${option.name}`);
    return option;
  }
}
