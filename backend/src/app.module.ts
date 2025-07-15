import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ExamsModule } from './exams/exams.module';

@Module({
  imports: [PrismaModule, ExamsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
