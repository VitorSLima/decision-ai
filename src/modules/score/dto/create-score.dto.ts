import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateScoreDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Identificador da opção vinculada ao critério',
    example: 'd52217b6-5eee-4beb-a109-bc317712545c',
  })
  optionId: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Identificador do critério associado à opção',
    example: '5f10d518-8646-40bf-8af9-1b7ebd28394d',
  })
  criterionId: string;
}
