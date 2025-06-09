import { Module } from '@nestjs/common';
import { BusinessModule } from './business/business.module';
import { ApiModule } from './api/api.module';
import { InfraModule } from './infra/infra.module';
import { BullModule } from '@nestjs/bull';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    BusinessModule,
    InfraModule,
    ApiModule,
    BullModule.forRootAsync({
      useFactory: () => ({
        redis: {
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
          password: process.env.REDIS_PASSWORD,
        },
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
