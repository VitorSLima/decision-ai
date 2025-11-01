import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CriterionService } from './criterion.service';
import { CreateCriterionDto } from './dto/create-criterion.dto';
import { UpdateCriterionDto } from './dto/update-criterion.dto';

@ApiTags('Criteria')
@Controller('criteria')
export class CriterionController {
  constructor(private readonly criterionService: CriterionService) {}

  @Post()
  create(@Body() createCriterionDto: CreateCriterionDto) {
    return this.criterionService.create(createCriterionDto);
  }

  @Get()
  findAll() {
    return this.criterionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.criterionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCriterionDto: UpdateCriterionDto,
  ) {
    return this.criterionService.update(id, updateCriterionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.criterionService.remove(id);
  }
}
