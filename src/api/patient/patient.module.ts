import { Module } from '@nestjs/common';
import { BusinessModule } from 'src/business/business.module';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { BullModule } from '@nestjs/bull';
import { QueueTokens } from 'src/infra/queue/tokens';

@Module({
  imports: [
    BusinessModule,
    BullModule.registerQueue({
      name: QueueTokens.NoteToken,
      settings: {
        maxStalledCount: 3,
        stalledInterval: 5000,
      },
      defaultJobOptions: {
        removeOnComplete: {
          age: 60 * 15,
        },
        timeout: 30000,
        attempts: 5,
        backoff: {
          type: 'exponential',
          delay: 3000,
        },
      },
    }),
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
