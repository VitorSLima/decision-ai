import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOptionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome da opção que será analisada no cenário',
    example: 'Fornecedor X',
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Descrição opcional da opção',
    example: 'Entrega em 45 dias com garantia estendida.',
    required: false,
  })
  description?: string;
}
