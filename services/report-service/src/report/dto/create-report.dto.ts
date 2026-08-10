import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateReportDto {
  @IsDateString()
  weekStart!: string;

  @IsDateString()
  weekEnd!: string;

  @IsOptional()
  @IsString()
  projectId?: string;

  @IsNotEmpty()
  @IsString()
  tasksCompleted!: string;

  @IsNotEmpty()
  @IsString()
  tasksPlanned!: string;

  @IsOptional()
  @IsString()
  blockers?: string;

  @IsOptional()
  @IsNumber()
  hoursWorked?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
