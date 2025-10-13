import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateScoreDto {
  @IsUUID()
  @IsNotEmpty()
  optionId: string;

  @IsUUID()
  @IsNotEmpty()
  criterionId: string;
}
