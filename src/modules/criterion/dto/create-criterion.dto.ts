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
  @ApiProperty({
    description: 'Peso do critério entre 0 e 1',
    example: 0.5,
  })
  weight: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'Indica se o critério está ativo',
    example: true,
    required: false,
    default: true,
  })
  active?: boolean;
}
