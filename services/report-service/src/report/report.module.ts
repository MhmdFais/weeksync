import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';

@Module({
  controllers: [ReportController],
  providers: [ReportService, JwtAuthGuard, RolesGuard],
})
export class ReportModule {}
