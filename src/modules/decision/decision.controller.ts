import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DecisionService } from './decision.service';
import { DecideDto } from './dto/decide.dto';

@ApiTags('Decision')
@Controller('decide')
export class DecisionController {
  constructor(private readonly decisionService: DecisionService) {}

  @Get()
  @ApiOperation({ summary: 'Lista as decisões calculadas para todos os cenários.' })
  @ApiOkResponse({ description: 'Decisões listadas com sucesso.' })
  list() {
    return this.decisionService.list();
  }

  @Post()
  @ApiOperation({ summary: 'Calcula a decisão de um cenário específico.' })
  @ApiBody({ type: DecideDto })
  @ApiOkResponse({ description: 'Decisão calculada com sucesso.' })
  decide(@Body() decideDto: DecideDto) {
    return this.decisionService.decide(decideDto);
  }
}
