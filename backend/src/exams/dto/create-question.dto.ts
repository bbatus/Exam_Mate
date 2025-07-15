import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  section: string;

  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  options: string[];

  @IsNotEmpty()
  @IsNumber()
  correct: number;

  @IsNotEmpty()
  @IsString()
  explanation: string;

  @IsNotEmpty()
  @IsNumber()
  examId: number;
} 