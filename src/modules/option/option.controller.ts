import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';

@ApiTags('Options')
@Controller()
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Post('scenarios/:scenarioId/options')
  create(
    @Param('scenarioId') scenarioId: string,
    @Body() createOptionDto: CreateOptionDto,
  ) {
    return this.optionService.create(scenarioId, createOptionDto);
  }

  @Get('scenarios/:scenarioId/options')
  findByScenario(@Param('scenarioId') scenarioId: string) {
    return this.optionService.findByScenario(scenarioId);
  }

  @Get('options/:id')
  findOne(@Param('id') id: string) {
    return this.optionService.findOne(id);
  }

  @Patch('options/:id')
  update(@Param('id') id: string, @Body() updateOptionDto: UpdateOptionDto) {
    return this.optionService.update(id, updateOptionDto);
  }

  @Delete('options/:id')
  remove(@Param('id') id: string) {
    return this.optionService.remove(id);
  }
}
