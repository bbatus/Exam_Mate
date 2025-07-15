import { IsArray, IsInt, IsNotEmpty, IsNumber, ValidateNested, IsString, IsOptional, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export class QuestionAnswerDto {
  @IsInt()
  @IsNotEmpty()
  questionId: number;

  @IsNotEmpty()
  selectedAnswer: string | null;

  @IsNotEmpty()
  isCorrect: boolean;
  
  @IsInt()
  @IsOptional()
  timeSpent?: number; // Time spent on this question in seconds
}

export enum ExamMode {
  PRACTICE = 'practice',
  REAL = 'real',
  TOPIC = 'topic',
}

export class CreateExamResultDto {
  @IsInt()
  @IsNotEmpty()
  examId: number;

  @IsNumber()
  @IsNotEmpty()
  score: number;

  @IsInt()
  @IsNotEmpty()
  totalQuestions: number;
  
  @IsEnum(ExamMode)
  @IsOptional()
  examMode?: ExamMode = ExamMode.PRACTICE;
  
  @IsInt()
  @IsOptional()
  timeSpent?: number; // Total time spent on the exam in seconds

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionAnswerDto)
  questionAnswers: QuestionAnswerDto[];
} 