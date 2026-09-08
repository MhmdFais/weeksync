import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { DashboardModule } from './dashboard/dashboard.module';
import { JwtConfigModule } from './auth/jwt-config/jwt-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtConfigModule,
    HttpModule,
    DashboardModule,
  ],
})
export class AppModule {}
