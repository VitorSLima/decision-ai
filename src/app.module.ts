import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScenarioModule } from './modules/scenario/scenario.module';
import { OptionModule } from './modules/option/option.module';
import { CriterionModule } from './modules/criterion/criterion.module';
import { ScoreModule } from './modules/score/score.module';
import { DecisionModule } from './modules/decision/decision.module';

@Module({
  imports: [ScenarioModule, OptionModule, CriterionModule, ScoreModule, DecisionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
