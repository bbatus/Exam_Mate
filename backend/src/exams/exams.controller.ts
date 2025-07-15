import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { CreateExamResultDto } from './dto/create-exam-result.dto';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

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

  @Post(':id/results')
  createExamResult(
    @Param('id', ParseIntPipe) id: number,
    @Body() createExamResultDto: CreateExamResultDto,
  ) {
    // Parametre olarak gelen ID ile DTO'daki ID'nin aynı olduğundan emin olalım
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
  @Post()
  createExam(@Body() createExamDto: CreateExamDto) {
    return this.examsService.createExam(createExamDto);
  }

  @Put(':id')
  updateExam(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExamDto: UpdateExamDto,
  ) {
    return this.examsService.updateExam(id, updateExamDto);
  }

  @Delete(':id')
  removeExam(@Param('id', ParseIntPipe) id: number) {
    return this.examsService.removeExam(id);
  }

  // Question management
  @Post(':id/questions')
  createQuestion(
    @Param('id', ParseIntPipe) examId: number,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    return this.examsService.createQuestion(examId, createQuestionDto);
  }

  @Put('questions/:id')
  updateQuestion(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.examsService.updateQuestion(id, updateQuestionDto);
  }

  @Delete('questions/:id')
  removeQuestion(@Param('id', ParseIntPipe) id: number) {
    return this.examsService.removeQuestion(id);
  }
} 