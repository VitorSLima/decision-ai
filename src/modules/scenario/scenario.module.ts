import { Logger, Module } from '@nestjs/common';
import { ScenarioService } from './scenario.service';
import { ScenarioController } from './scenario.controller';
import * as UseCases from './use-cases';
import * as Repositories from './repository';
import { SharedModule } from '../../shared/shared.module';

const useCases = Object.values(UseCases);
const repositories = Object.values(Repositories);

@Module({
  imports: [SharedModule],
  controllers: [ScenarioController],
  providers: [ScenarioService, ...useCases, ...repositories, Logger],
})
export class ScenarioModule {}
