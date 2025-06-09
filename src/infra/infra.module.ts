import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [PrismaModule, QueueModule],
})
export class InfraModule {}
