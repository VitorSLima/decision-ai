import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DecisionService } from './decision.service';
import { DecideDto } from './dto/decide.dto';

@ApiTags('Decision')
@Controller('decide')
export class DecisionController {
  constructor(private readonly decisionService: DecisionService) {}

  @Post()
  decide(@Body() decideDto: DecideDto) {
    return this.decisionService.decide(decideDto);
  }
}
