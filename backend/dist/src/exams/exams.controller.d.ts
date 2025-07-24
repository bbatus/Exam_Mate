import { ExamsService } from './exams.service';
import { CreateExamResultDto } from './dto/create-exam-result.dto';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
export declare class ExamsController {
    private readonly examsService;
    constructor(examsService: ExamsService);
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
        options: string[];
        correct: number;
        originalCorrect: number;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        question: string;
        section: string;
        explanation: string;
        category: string | null;
        examId: number;
    }[]>;
    createExamResult(id: number, createExamResultDto: CreateExamResultDto): Promise<{
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
    getExamResults(id: number): Promise<({
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
    getExamStatistics(id: number): Promise<{
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
        wrongAnswerPatterns: import("./exams.service").WrongAnswerPattern[];
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
