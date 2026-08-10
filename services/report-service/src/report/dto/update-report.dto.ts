import { PartialType } from '@nestjs/mapped-types';
import { CreateReportDto } from './create-report.dto';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateReportDto extends PartialType(CreateReportDto) {}
