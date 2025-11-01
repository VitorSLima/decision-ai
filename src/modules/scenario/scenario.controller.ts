import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ScenarioService } from './scenario.service';
import { CreateScenarioDto } from './dto/create-scenario.dto';
import { UpdateScenarioDto } from './dto/update-scenario.dto';

@ApiTags('Scenarios')
@Controller('scenarios')
export class ScenarioController {
  constructor(private readonly scenarioService: ScenarioService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo cenário de decisão.' })
  @ApiCreatedResponse({ description: 'Cenário criado com sucesso.' })
  @ApiBody({ type: CreateScenarioDto })
  create(@Body() createScenarioDto: CreateScenarioDto) {
    return this.scenarioService.create(createScenarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os cenários cadastrados.' })
  @ApiOkResponse({ description: 'Cenários listados com sucesso.' })
  findAll() {
    return this.scenarioService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um cenário específico.' })
  @ApiParam({
    name: 'id',
    description: 'Identificador do cenário',
  })
  @ApiOkResponse({ description: 'Cenário encontrado com sucesso.' })
  findOne(@Param('id') id: string) {
    return this.scenarioService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um cenário existente.' })
  @ApiParam({
    name: 'id',
    description: 'Identificador do cenário',
  })
  @ApiOkResponse({ description: 'Cenário atualizado com sucesso.' })
  @ApiBody({ type: UpdateScenarioDto })
  update(@Param('id') id: string, @Body() updateScenarioDto: UpdateScenarioDto) {
    return this.scenarioService.update(id, updateScenarioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um cenário.' })
  @ApiParam({
    name: 'id',
    description: 'Identificador do cenário',
  })
  @ApiOkResponse({ description: 'Cenário removido com sucesso.' })
  remove(@Param('id') id: string) {
    return this.scenarioService.remove(id);
  }
}
