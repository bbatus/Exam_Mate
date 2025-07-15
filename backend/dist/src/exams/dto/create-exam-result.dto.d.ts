export declare class QuestionAnswerDto {
    questionId: number;
    selectedAnswer: string | null;
    isCorrect: boolean;
    timeSpent?: number;
}
export declare enum ExamMode {
    PRACTICE = "practice",
    REAL = "real",
    TOPIC = "topic"
}
export declare class CreateExamResultDto {
    examId: number;
    score: number;
    totalQuestions: number;
    examMode?: ExamMode;
    timeSpent?: number;
    questionAnswers: QuestionAnswerDto[];
}
