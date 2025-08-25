import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScenarioModule } from './modules/scenario/scenario.module';

@Module({
  imports: [ScenarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
