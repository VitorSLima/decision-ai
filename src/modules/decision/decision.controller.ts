import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DecisionService } from './decision.service';
import { DecideDto } from './dto/decide.dto';

@ApiTags('Decision')
@Controller('decide')
export class DecisionController {
  constructor(private readonly decisionService: DecisionService) {}

  @Get()
  list() {
    return this.decisionService.list();
  }

  @Post()
  decide(@Body() decideDto: DecideDto) {
    return this.decisionService.decide(decideDto);
  }
}
