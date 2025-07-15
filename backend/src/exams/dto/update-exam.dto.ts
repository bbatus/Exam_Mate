import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateExamDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title?: string;
} 