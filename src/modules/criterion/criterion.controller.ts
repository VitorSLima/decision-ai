import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CriterionService } from './criterion.service';
import { CreateCriterionDto } from './dto/create-criterion.dto';
import { UpdateCriterionDto } from './dto/update-criterion.dto';

@ApiTags('Criteria')
@Controller('criteria')
export class CriterionController {
  constructor(private readonly criterionService: CriterionService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um critério para avaliação.' })
  @ApiBody({ type: CreateCriterionDto })
  @ApiCreatedResponse({ description: 'Critério criado com sucesso.' })
  create(@Body() createCriterionDto: CreateCriterionDto) {
    return this.criterionService.create(createCriterionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os critérios cadastrados.' })
  @ApiOkResponse({ description: 'Critérios listados com sucesso.' })
  findAll() {
    return this.criterionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um critério específico.' })
  @ApiParam({
    name: 'id',
    description: 'Identificador do critério',
  })
  @ApiOkResponse({ description: 'Critério encontrado com sucesso.' })
  findOne(@Param('id') id: string) {
    return this.criterionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um critério existente.' })
  @ApiParam({
    name: 'id',
    description: 'Identificador do critério',
  })
  @ApiBody({ type: UpdateCriterionDto })
  @ApiOkResponse({ description: 'Critério atualizado com sucesso.' })
  update(
    @Param('id') id: string,
    @Body() updateCriterionDto: UpdateCriterionDto,
  ) {
    return this.criterionService.update(id, updateCriterionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um critério.' })
  @ApiParam({
    name: 'id',
    description: 'Identificador do critério',
  })
  @ApiOkResponse({ description: 'Critério removido com sucesso.' })
  remove(@Param('id') id: string) {
    return this.criterionService.remove(id);
  }
}
