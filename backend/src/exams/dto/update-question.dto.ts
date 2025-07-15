import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateQuestionDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  section?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  question?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  options?: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  correct?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  explanation?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  examId?: number;
} 