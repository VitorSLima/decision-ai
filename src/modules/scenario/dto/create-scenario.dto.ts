import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateScenarioDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Título do cenário de decisão',
    example: 'Expansão Internacional da Empresa',
  })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Descrição opcional com detalhes do cenário',
    example: 'Avaliação das melhores regiões para abrir novos escritórios.',
    required: false,
  })
  description?: string;
}
