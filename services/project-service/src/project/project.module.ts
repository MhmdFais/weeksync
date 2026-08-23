import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, JwtAuthGuard, RolesGuard],
})
export class ProjectModule {}
