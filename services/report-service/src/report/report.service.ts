import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: number, dto: CreateReportDto) {
    return this.prisma.report.create({
      data: {
        userId,
        weekStart: new Date(dto.weekStart),
        weekEnd: new Date(dto.weekEnd),
        projectId: dto.projectId,
        tasksCompleted: dto.tasksCompleted,
        tasksPlanned: dto.tasksPlanned,
        blockers: dto.blockers,
        hoursWorked: dto.hoursWorked,
        notes: dto.notes,
      },
    });
  }

  findAllForUser(userId: number) {
    return this.prisma.report.findMany({
      where: { userId },
      orderBy: { weekStart: 'desc' },
    });
  }

  async findOne(userId: number, id: number) {
    const report = await this.prisma.report.findUnique({ where: { id } });
    if (!report) throw new NotFoundException('report not found');
    if (report.userId !== userId)
      throw new ForbiddenException('not your report');
    return report;
  }

  async update(userId: number, id: number, dto: UpdateReportDto) {
    await this.findOne(userId, id); // ownership + existence check
    return this.prisma.report.update({
      where: { id },
      data: {
        ...dto,
        weekStart: dto.weekStart ? new Date(dto.weekStart) : undefined,
        weekEnd: dto.weekEnd ? new Date(dto.weekEnd) : undefined,
      },
    });
  }

  async submit(userId: number, id: number) {
    await this.findOne(userId, id);
    return this.prisma.report.update({
      where: { id },
      data: { status: 'submitted' },
    });
  }
}
