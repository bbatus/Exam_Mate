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
    wrongAnswers: {
        answer: string;
        count: number;
    }[];
}
export declare class ExamsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        title: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__ExamClient<({
        questions: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            question: string;
            section: string;
            options: string[];
            correct: number;
            explanation: string;
            category: string | null;
            examId: number;
        }[];
    } & {
        id: number;
        title: string;
        createdAt: Date;
        updatedAt: Date;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    getExamQuestions(examId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        question: string;
        section: string;
        options: string[];
        correct: number;
        explanation: string;
        category: string | null;
        examId: number;
    }[]>;
    createExamResult(createExamResultDto: CreateExamResultDto): Promise<{
        exam: {
            id: number;
            title: string;
            createdAt: Date;
            updatedAt: Date;
        };
        questionAnswers: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            questionId: number;
            selectedAnswer: string | null;
            isCorrect: boolean;
            timeSpent: number | null;
            examResultId: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        examId: number;
        timeSpent: number | null;
        score: number;
        totalQuestions: number;
        examMode: string;
    }>;
    getExamResults(examId: number): Promise<({
        questionAnswers: ({
            question: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                question: string;
                section: string;
                options: string[];
                correct: number;
                explanation: string;
                category: string | null;
                examId: number;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            questionId: number;
            selectedAnswer: string | null;
            isCorrect: boolean;
            timeSpent: number | null;
            examResultId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        examId: number;
        timeSpent: number | null;
        score: number;
        totalQuestions: number;
        examMode: string;
    })[]>;
    getExamResultById(resultId: number): Promise<({
        exam: {
            id: number;
            title: string;
            createdAt: Date;
            updatedAt: Date;
        };
        questionAnswers: ({
            question: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                question: string;
                section: string;
                options: string[];
                correct: number;
                explanation: string;
                category: string | null;
                examId: number;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            questionId: number;
            selectedAnswer: string | null;
            isCorrect: boolean;
            timeSpent: number | null;
            examResultId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        examId: number;
        timeSpent: number | null;
        score: number;
        totalQuestions: number;
        examMode: string;
    }) | null>;
    getExamStatistics(examId: number): Promise<{
        totalAttempts: number;
        averageScore: number;
        bestScore: number;
        averageTimeSpent: number;
        categoryPerformance: {};
        timeBasedPerformance: {
            date: Date;
            score: number;
            timeSpent: any;
        }[];
        wrongAnswerPatterns: WrongAnswerPattern[];
    }>;
    createExam(createExamDto: CreateExamDto): Promise<{
        id: number;
        title: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateExam(id: number, updateExamDto: UpdateExamDto): Promise<{
        id: number;
        title: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    removeExam(id: number): Promise<{
        id: number;
        title: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createQuestion(examId: number, createQuestionDto: CreateQuestionDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        question: string;
        section: string;
        options: string[];
        correct: number;
        explanation: string;
        category: string | null;
        examId: number;
    }>;
    updateQuestion(id: number, updateQuestionDto: UpdateQuestionDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        question: string;
        section: string;
        options: string[];
        correct: number;
        explanation: string;
        category: string | null;
        examId: number;
    }>;
    removeQuestion(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        question: string;
        section: string;
        options: string[];
        correct: number;
        explanation: string;
        category: string | null;
        examId: number;
    }>;
    bulkCreateQuestions(examId: number, questions: CreateQuestionDto[]): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        question: string;
        section: string;
        options: string[];
        correct: number;
        explanation: string;
        category: string | null;
        examId: number;
    }[]>;
}
