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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamsController = void 0;
const common_1 = require("@nestjs/common");
const exams_service_1 = require("./exams.service");
const create_exam_result_dto_1 = require("./dto/create-exam-result.dto");
const create_exam_dto_1 = require("./dto/create-exam.dto");
const update_exam_dto_1 = require("./dto/update-exam.dto");
const create_question_dto_1 = require("./dto/create-question.dto");
const update_question_dto_1 = require("./dto/update-question.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let ExamsController = class ExamsController {
    examsService;
    constructor(examsService) {
        this.examsService = examsService;
    }
    findAll() {
        return this.examsService.findAll();
    }
    findOne(id) {
        return this.examsService.findOne(id);
    }
    getExamQuestions(examId) {
        return this.examsService.getExamQuestions(examId);
    }
    createExamResult(id, createExamResultDto) {
        if (id !== createExamResultDto.examId) {
            createExamResultDto.examId = id;
        }
        return this.examsService.createExamResult(createExamResultDto);
    }
    getExamResults(id) {
        return this.examsService.getExamResults(id);
    }
    getExamResultById(resultId) {
        return this.examsService.getExamResultById(resultId);
    }
    getExamStatistics(id) {
        return this.examsService.getExamStatistics(id);
    }
    createExam(createExamDto) {
        return this.examsService.createExam(createExamDto);
    }
    updateExam(id, updateExamDto) {
        return this.examsService.updateExam(id, updateExamDto);
    }
    removeExam(id) {
        return this.examsService.removeExam(id);
    }
    createQuestion(examId, createQuestionDto) {
        return this.examsService.createQuestion(examId, createQuestionDto);
    }
    updateQuestion(id, updateQuestionDto) {
        return this.examsService.updateQuestion(id, updateQuestionDto);
    }
    removeQuestion(id) {
        return this.examsService.removeQuestion(id);
    }
    bulkCreateQuestions(examId, questions) {
        return this.examsService.bulkCreateQuestions(examId, questions);
    }
};
exports.ExamsController = ExamsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':examId/questions'),
    __param(0, (0, common_1.Param)('examId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "getExamQuestions", null);
__decorate([
    (0, common_1.Post)(':id/results'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_exam_result_dto_1.CreateExamResultDto]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "createExamResult", null);
__decorate([
    (0, common_1.Get)(':id/results'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "getExamResults", null);
__decorate([
    (0, common_1.Get)('results/:resultId'),
    __param(0, (0, common_1.Param)('resultId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "getExamResultById", null);
__decorate([
    (0, common_1.Get)(':id/statistics'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "getExamStatistics", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_exam_dto_1.CreateExamDto]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "createExam", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_exam_dto_1.UpdateExamDto]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "updateExam", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "removeExam", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':examId/questions'),
    __param(0, (0, common_1.Param)('examId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_question_dto_1.CreateQuestionDto]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "createQuestion", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('questions/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_question_dto_1.UpdateQuestionDto]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "updateQuestion", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('questions/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "removeQuestion", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':examId/questions/bulk'),
    __param(0, (0, common_1.Param)('examId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "bulkCreateQuestions", null);
exports.ExamsController = ExamsController = __decorate([
    (0, common_1.Controller)('exams'),
    __metadata("design:paramtypes", [exams_service_1.ExamsService])
], ExamsController);
//# sourceMappingURL=exams.controller.js.map