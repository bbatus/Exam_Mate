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
exports.CreateExamResultDto = exports.ExamMode = exports.QuestionAnswerDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class QuestionAnswerDto {
    questionId;
    selectedAnswer;
    isCorrect;
    timeSpent;
}
exports.QuestionAnswerDto = QuestionAnswerDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], QuestionAnswerDto.prototype, "questionId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], QuestionAnswerDto.prototype, "selectedAnswer", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], QuestionAnswerDto.prototype, "isCorrect", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], QuestionAnswerDto.prototype, "timeSpent", void 0);
var ExamMode;
(function (ExamMode) {
    ExamMode["PRACTICE"] = "practice";
    ExamMode["REAL"] = "real";
    ExamMode["TOPIC"] = "topic";
})(ExamMode || (exports.ExamMode = ExamMode = {}));
class CreateExamResultDto {
    examId;
    score;
    totalQuestions;
    examMode = ExamMode.PRACTICE;
    timeSpent;
    questionAnswers;
}
exports.CreateExamResultDto = CreateExamResultDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateExamResultDto.prototype, "examId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateExamResultDto.prototype, "score", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateExamResultDto.prototype, "totalQuestions", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(ExamMode),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateExamResultDto.prototype, "examMode", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateExamResultDto.prototype, "timeSpent", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => QuestionAnswerDto),
    __metadata("design:type", Array)
], CreateExamResultDto.prototype, "questionAnswers", void 0);
//# sourceMappingURL=create-exam-result.dto.js.map