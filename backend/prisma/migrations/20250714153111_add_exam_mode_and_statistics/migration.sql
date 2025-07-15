-- AlterTable
ALTER TABLE "ExamResult" ADD COLUMN     "examMode" TEXT NOT NULL DEFAULT 'practice',
ADD COLUMN     "timeSpent" INTEGER;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "category" TEXT;

-- AlterTable
ALTER TABLE "QuestionAnswer" ADD COLUMN     "timeSpent" INTEGER;
