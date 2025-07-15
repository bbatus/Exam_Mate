import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExamResultDto } from './dto/create-exam-result.dto';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

export interface WrongAnswerPattern {
  questionId: number;
  question: string;
  totalWrong: number;
  wrongAnswers: { answer: string; count: number }[];
}

@Injectable()
export class ExamsService {
  constructor(private prisma: PrismaService) {}
  
  findAll() {
    return this.prisma.exam.findMany();
  }

  findOne(id: number) {
    return this.prisma.exam.findUnique({
      where: { id },
      include: {
        questions: true,
      },
    });
  }

  async getExamQuestions(examId: number) {
    return this.prisma.question.findMany({
      where: { examId },
    });
  }

  async createExamResult(createExamResultDto: CreateExamResultDto) {
    const { examId, score, totalQuestions, questionAnswers, examMode, timeSpent } = createExamResultDto;

    // Önce sınav sonucunu oluştur
    const examResult = await this.prisma.examResult.create({
      data: {
        examId,
        score,
        totalQuestions,
        ...(examMode && { examMode } as any),
        ...(timeSpent !== undefined && { timeSpent } as any),
        questionAnswers: {
          create: questionAnswers.map(qa => ({
            questionId: qa.questionId,
            selectedAnswer: qa.selectedAnswer,
            isCorrect: qa.isCorrect,
            ...(qa.timeSpent !== undefined && { timeSpent: qa.timeSpent } as any),
          })),
        },
      },
      include: {
        questionAnswers: true,
        exam: true,
      },
    });

    return examResult;
  }

  async getExamResults(examId: number) {
    return this.prisma.examResult.findMany({
      where: {
        examId,
      },
      include: {
        questionAnswers: {
          include: {
            question: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getExamResultById(resultId: number) {
    return this.prisma.examResult.findUnique({
      where: {
        id: resultId,
      },
      include: {
        questionAnswers: {
          include: {
            question: true,
          },
        },
        exam: true,
      },
    });
  }
  
  // Add new method to get statistics for a user's exam results
  async getExamStatistics(examId: number) {
    const results = await this.prisma.examResult.findMany({
      where: {
        examId,
      },
      include: {
        questionAnswers: {
          include: {
            question: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    
    if (results.length === 0) {
      return {
        totalAttempts: 0,
        averageScore: 0,
        bestScore: 0,
        averageTimeSpent: 0,
        categoryPerformance: {},
        timeBasedPerformance: [],
        wrongAnswerPatterns: [],
      };
    }
    
    // Calculate statistics
    const totalAttempts = results.length;
    const averageScore = results.reduce((sum, result) => sum + (result.score / result.totalQuestions) * 100, 0) / totalAttempts;
    const bestScore = Math.max(...results.map(result => (result.score / result.totalQuestions) * 100));
    
    // timeSpent özelliğini güvenli bir şekilde kullanma
    const averageTimeSpent = results
      .filter(result => result['timeSpent'] !== undefined && result['timeSpent'] !== null)
      .reduce((sum, result) => sum + (result['timeSpent'] as number || 0), 0) / 
      results.filter(result => result['timeSpent'] !== undefined && result['timeSpent'] !== null).length || 0;
    
    // Category performance analysis
    const categoryPerformance = {};
    results.forEach(result => {
      result.questionAnswers.forEach(qa => {
        // category özelliğini güvenli bir şekilde kullanma
        const category = (qa.question as any)['category'] || 'Uncategorized';
        
        if (!categoryPerformance[category]) {
          categoryPerformance[category] = {
            total: 0,
            correct: 0,
            percentage: 0,
          };
        }
        
        categoryPerformance[category].total++;
        if (qa.isCorrect) {
          categoryPerformance[category].correct++;
        }
      });
    });
    
    // Calculate percentages for each category
    Object.keys(categoryPerformance).forEach(category => {
      const { total, correct } = categoryPerformance[category];
      categoryPerformance[category].percentage = (correct / total) * 100;
    });
    
    // Time-based performance analysis
    const timeBasedPerformance = results.map(result => ({
      date: result.createdAt,
      score: (result.score / result.totalQuestions) * 100,
      timeSpent: (result as any)['timeSpent'] || 0,
    }));
    
    // Wrong answer patterns analysis
    const wrongAnswerPatterns: WrongAnswerPattern[] = [];
    const questionStats: Record<string, { question: string; totalWrong: number; wrongAnswers: Record<string, number> }> = {};
    
    results.forEach(result => {
      result.questionAnswers.forEach(qa => {
        if (!qa.isCorrect && qa.selectedAnswer) {
          const questionId = qa.questionId;
          
          if (!questionStats[questionId]) {
            questionStats[questionId] = {
              question: qa.question.question,
              totalWrong: 0,
              wrongAnswers: {},
            };
          }
          
          questionStats[questionId].totalWrong++;
          
          const selectedAnswer = qa.selectedAnswer;
          if (!questionStats[questionId].wrongAnswers[selectedAnswer]) {
            questionStats[questionId].wrongAnswers[selectedAnswer] = 0;
          }
          
          questionStats[questionId].wrongAnswers[selectedAnswer]++;
        }
      });
    });
    
    // Convert to array and sort by most frequently wrong questions
    Object.keys(questionStats).forEach(questionId => {
      wrongAnswerPatterns.push({
        questionId: parseInt(questionId),
        question: questionStats[questionId].question,
        totalWrong: questionStats[questionId].totalWrong,
        wrongAnswers: Object.entries(questionStats[questionId].wrongAnswers)
          .map(([answer, count]) => ({ answer, count }))
          .sort((a, b) => b.count - a.count),
      });
    });
    
    wrongAnswerPatterns.sort((a, b) => b.totalWrong - a.totalWrong);
    
    return {
      totalAttempts,
      averageScore,
      bestScore,
      averageTimeSpent,
      categoryPerformance,
      timeBasedPerformance,
      wrongAnswerPatterns: wrongAnswerPatterns.slice(0, 10), // Top 10 most problematic questions
    };
  }

  // Admin CRUD operations
  async createExam(createExamDto: CreateExamDto) {
    return this.prisma.exam.create({
      data: createExamDto,
    });
  }

  async updateExam(id: number, updateExamDto: UpdateExamDto) {
    const existingExam = await this.prisma.exam.findUnique({
      where: { id },
    });

    if (!existingExam) {
      throw new NotFoundException(`Exam with ID ${id} not found`);
    }

    return this.prisma.exam.update({
      where: { id },
      data: updateExamDto,
    });
  }

  async removeExam(id: number) {
    const existingExam = await this.prisma.exam.findUnique({
      where: { id },
      include: {
        questions: true,
        results: true
      }
    });

    if (!existingExam) {
      throw new NotFoundException(`Exam with ID ${id} not found`);
    }

    // Önce ilişkili sonuçları sil
    if (existingExam.results.length > 0) {
      await this.prisma.examResult.deleteMany({
        where: { examId: id },
      });
    }

    // Sonra ilişkili soruları sil
    if (existingExam.questions.length > 0) {
      await this.prisma.question.deleteMany({
        where: { examId: id },
      });
    }

    // Son olarak sınavı sil
    return this.prisma.exam.delete({
      where: { id },
    });
  }

  async createQuestion(examId: number, createQuestionDto: CreateQuestionDto) {
    const existingExam = await this.prisma.exam.findUnique({
      where: { id: examId },
    });

    if (!existingExam) {
      throw new NotFoundException(`Exam with ID ${examId} not found`);
    }

    return this.prisma.question.create({
      data: {
        ...createQuestionDto,
        examId,
      },
    });
  }

  async updateQuestion(id: number, updateQuestionDto: UpdateQuestionDto) {
    const existingQuestion = await this.prisma.question.findUnique({
      where: { id },
    });

    if (!existingQuestion) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    return this.prisma.question.update({
      where: { id },
      data: updateQuestionDto,
    });
  }

  async removeQuestion(id: number) {
    const existingQuestion = await this.prisma.question.findUnique({
      where: { id },
    });

    if (!existingQuestion) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    return this.prisma.question.delete({
      where: { id },
    });
  }

  async bulkCreateQuestions(examId: number, questions: CreateQuestionDto[]) {
    const existingExam = await this.prisma.exam.findUnique({
      where: { id: examId },
    });

    if (!existingExam) {
      throw new NotFoundException(`Exam with ID ${examId} not found`);
    }

    // Process each question and add the examId
    const questionsWithExamId = questions.map(question => ({
      ...question,
      examId,
    }));

    // Create all questions in a transaction
    return this.prisma.$transaction(
      questionsWithExamId.map(question => 
        this.prisma.question.create({ data: question })
      )
    );
  }
} 