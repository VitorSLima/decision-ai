import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateScenarioDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}
