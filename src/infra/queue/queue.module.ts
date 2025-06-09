import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { QueueTokens } from './tokens';

@Module({
  imports: [
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
})
export class QueueModule {}
