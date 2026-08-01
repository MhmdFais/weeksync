import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtConfigModule } from './jwt-config/jwt-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
    }),
    HealthModule,
    AuthModule,
    PrismaModule,
    JwtConfigModule,
  ],
})
export class AppModule {}
