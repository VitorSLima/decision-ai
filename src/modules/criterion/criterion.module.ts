import { Logger, Module } from '@nestjs/common';
import { CriterionService } from './criterion.service';
import { CriterionController } from './criterion.controller';
import * as UseCases from './use-cases';
import * as Repositories from './repository';
import { SharedModule } from '../../shared/shared.module';

const useCases = Object.values(UseCases);
const repositories = Object.values(Repositories);

@Module({
  imports: [SharedModule],
  controllers: [CriterionController],
  providers: [CriterionService, ...useCases, ...repositories, Logger],
})
export class CriterionModule {}
