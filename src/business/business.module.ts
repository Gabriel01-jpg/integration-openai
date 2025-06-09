import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infra/database/prisma.module';
import { PatientRepository } from './repositories/patient.repository';
import { S3ClientService } from './services/BucketService';
import { NoteProcessor } from './processors/note.processor';
import { OpenAiService } from './services/OpenAiService';

@Module({
  imports: [PrismaModule],
  providers: [PatientRepository, S3ClientService, OpenAiService, NoteProcessor],
  exports: [PatientRepository, S3ClientService, OpenAiService, NoteProcessor],
})
export class BusinessModule {}
