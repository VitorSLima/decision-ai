import { IsNotEmpty, IsUUID } from 'class-validator';

export class DecideDto {
  @IsUUID()
  @IsNotEmpty()
  scenarioId: string;
}
