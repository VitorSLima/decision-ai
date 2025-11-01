import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ScoreService } from './score.service';
import { CreateScoreDto } from './dto/create-score.dto';

@ApiTags('Scores')
@Controller('scores')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os vínculos entre opções e critérios.' })
  @ApiOkResponse({ description: 'Scores listados com sucesso.' })
  list() {
    return this.scoreService.list();
  }

  @Post()
  @ApiOperation({ summary: 'Cria um vínculo entre opção e critério.' })
  @ApiBody({ type: CreateScoreDto })
  @ApiCreatedResponse({ description: 'Score criado com sucesso.' })
  create(@Body() createScoreDto: CreateScoreDto) {
    return this.scoreService.create(createScoreDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um vínculo entre opção e critério.' })
  @ApiParam({
    name: 'id',
    description: 'Identificador do score',
  })
  @ApiOkResponse({ description: 'Score removido com sucesso.' })
  remove(@Param('id') id: string) {
    return this.scoreService.remove(id);
  }
}
