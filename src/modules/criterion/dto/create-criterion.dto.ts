import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateCriterionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do critério',
    example: 'Life',
  })
  name: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(1)
  weight: number;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
