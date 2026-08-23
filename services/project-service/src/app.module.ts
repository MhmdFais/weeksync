import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectModule } from './project/project.module';
import { JwtConfigModule } from './auth/jwt-config/jwt-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtConfigModule,
    PrismaModule,
    ProjectModule,
  ],
})
export class AppModule {}
