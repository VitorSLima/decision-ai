import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class DecideDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Identificador do cenário que terá a decisão calculada',
    example: '78ab441c-4173-4eef-bb1c-536b30007775',
  })
  scenarioId: string;
}
