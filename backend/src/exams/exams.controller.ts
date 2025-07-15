import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { CreateExamResultDto } from './dto/create-exam-result.dto';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  // Public endpoints
  @Get()
  findAll() {
    return this.examsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.examsService.findOne(id);
  }

  @Get(':examId/questions')
  getExamQuestions(@Param('examId', ParseIntPipe) examId: number) {
    return this.examsService.getExamQuestions(examId);
  }

  @Post(':id/results')
  createExamResult(
    @Param('id', ParseIntPipe) id: number,
    @Body() createExamResultDto: CreateExamResultDto,
  ) {
    if (id !== createExamResultDto.examId) {
      createExamResultDto.examId = id;
    }
    return this.examsService.createExamResult(createExamResultDto);
  }

  @Get(':id/results')
  getExamResults(@Param('id', ParseIntPipe) id: number) {
    return this.examsService.getExamResults(id);
  }

  @Get('results/:resultId')
  getExamResultById(@Param('resultId', ParseIntPipe) resultId: number) {
    return this.examsService.getExamResultById(resultId);
  }

  @Get(':id/statistics')
  getExamStatistics(@Param('id', ParseIntPipe) id: number) {
    return this.examsService.getExamStatistics(id);
  }

  // Admin endpoints
  @UseGuards(JwtAuthGuard)
  @Post()
  createExam(@Body() createExamDto: CreateExamDto) {
    return this.examsService.createExam(createExamDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateExam(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExamDto: UpdateExamDto,
  ) {
    return this.examsService.updateExam(id, updateExamDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  removeExam(@Param('id', ParseIntPipe) id: number) {
    return this.examsService.removeExam(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':examId/questions')
  createQuestion(
    @Param('examId', ParseIntPipe) examId: number,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    return this.examsService.createQuestion(examId, createQuestionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('questions/:id')
  updateQuestion(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.examsService.updateQuestion(id, updateQuestionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('questions/:id')
  removeQuestion(@Param('id', ParseIntPipe) id: number) {
    return this.examsService.removeQuestion(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':examId/questions/bulk')
  bulkCreateQuestions(
    @Param('examId', ParseIntPipe) examId: number,
    @Body() questions: CreateQuestionDto[],
  ) {
    return this.examsService.bulkCreateQuestions(examId, questions);
  }
} 