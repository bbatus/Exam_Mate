"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}
let ExamsService = class ExamsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.exam.findMany();
    }
    findOne(id) {
        return this.prisma.exam.findUnique({
            where: { id },
            include: {
                questions: true,
            },
        });
    }
    async getExamQuestions(examId) {
        const questions = await this.prisma.question.findMany({
            where: { examId },
        });
        const shuffledQuestions = shuffleArray(questions);
        return shuffledQuestions.map(question => {
            const options = [...question.options];
            const correctOption = options[question.correct];
            const shuffledOptions = shuffleArray(options);
            const newCorrectIndex = shuffledOptions.findIndex(option => option === correctOption);
            return {
                ...question,
                options: shuffledOptions,
                correct: newCorrectIndex,
                originalCorrect: question.correct
            };
        });
    }
    async createExamResult(createExamResultDto) {
        const { examId, score, totalQuestions, questionAnswers, examMode, timeSpent } = createExamResultDto;
        const examResult = await this.prisma.examResult.create({
            data: {
                examId,
                score,
                totalQuestions,
                ...(examMode && { examMode }),
                ...(timeSpent !== undefined && { timeSpent }),
                questionAnswers: {
                    create: questionAnswers.map(qa => ({
                        questionId: qa.questionId,
                        selectedAnswer: qa.selectedAnswer,
                        isCorrect: qa.isCorrect,
                        ...(qa.timeSpent !== undefined && { timeSpent: qa.timeSpent }),
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
    async getExamResults(examId) {
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
    async getExamResultById(resultId) {
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
    async getExamStatistics(examId) {
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
        const totalAttempts = results.length;
        const averageScore = results.reduce((sum, result) => sum + (result.score / result.totalQuestions) * 100, 0) / totalAttempts;
        const bestScore = Math.max(...results.map(result => (result.score / result.totalQuestions) * 100));
        const averageTimeSpent = results
            .filter(result => result['timeSpent'] !== undefined && result['timeSpent'] !== null)
            .reduce((sum, result) => sum + (result['timeSpent'] || 0), 0) /
            results.filter(result => result['timeSpent'] !== undefined && result['timeSpent'] !== null).length || 0;
        const categoryPerformance = {};
        results.forEach(result => {
            result.questionAnswers.forEach(qa => {
                const category = qa.question['category'] || 'Uncategorized';
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
        Object.keys(categoryPerformance).forEach(category => {
            const { total, correct } = categoryPerformance[category];
            categoryPerformance[category].percentage = (correct / total) * 100;
        });
        const timeBasedPerformance = results.map(result => ({
            date: result.createdAt,
            score: (result.score / result.totalQuestions) * 100,
            timeSpent: result['timeSpent'] || 0,
        }));
        const wrongAnswerPatterns = [];
        const questionStats = {};
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
            wrongAnswerPatterns: wrongAnswerPatterns.slice(0, 10),
        };
    }
    async createExam(createExamDto) {
        return this.prisma.exam.create({
            data: createExamDto,
        });
    }
    async updateExam(id, updateExamDto) {
        const existingExam = await this.prisma.exam.findUnique({
            where: { id },
        });
        if (!existingExam) {
            throw new common_1.NotFoundException(`Exam with ID ${id} not found`);
        }
        return this.prisma.exam.update({
            where: { id },
            data: updateExamDto,
        });
    }
    async removeExam(id) {
        const existingExam = await this.prisma.exam.findUnique({
            where: { id },
            include: {
                questions: true,
                results: true
            }
        });
        if (!existingExam) {
            throw new common_1.NotFoundException(`Exam with ID ${id} not found`);
        }
        if (existingExam.results.length > 0) {
            await this.prisma.examResult.deleteMany({
                where: { examId: id },
            });
        }
        if (existingExam.questions.length > 0) {
            await this.prisma.question.deleteMany({
                where: { examId: id },
            });
        }
        return this.prisma.exam.delete({
            where: { id },
        });
    }
    async createQuestion(examId, createQuestionDto) {
        const existingExam = await this.prisma.exam.findUnique({
            where: { id: examId },
        });
        if (!existingExam) {
            throw new common_1.NotFoundException(`Exam with ID ${examId} not found`);
        }
        return this.prisma.question.create({
            data: {
                ...createQuestionDto,
                examId,
            },
        });
    }
    async updateQuestion(id, updateQuestionDto) {
        const existingQuestion = await this.prisma.question.findUnique({
            where: { id },
        });
        if (!existingQuestion) {
            throw new common_1.NotFoundException(`Question with ID ${id} not found`);
        }
        return this.prisma.question.update({
            where: { id },
            data: updateQuestionDto,
        });
    }
    async removeQuestion(id) {
        const existingQuestion = await this.prisma.question.findUnique({
            where: { id },
        });
        if (!existingQuestion) {
            throw new common_1.NotFoundException(`Question with ID ${id} not found`);
        }
        return this.prisma.question.delete({
            where: { id },
        });
    }
    async bulkCreateQuestions(examId, questions) {
        const existingExam = await this.prisma.exam.findUnique({
            where: { id: examId },
        });
        if (!existingExam) {
            throw new common_1.NotFoundException(`Exam with ID ${examId} not found`);
        }
        const questionsWithExamId = questions.map(question => ({
            ...question,
            examId,
        }));
        return this.prisma.$transaction(questionsWithExamId.map(question => this.prisma.question.create({ data: question })));
    }
};
exports.ExamsService = ExamsService;
exports.ExamsService = ExamsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExamsService);
//# sourceMappingURL=exams.service.js.map