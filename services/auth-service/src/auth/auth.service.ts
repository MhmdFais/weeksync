import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  register(dto: RegisterDto) {
    // TODO: replace with Prisma once schema spike is confirmed
    return { message: 'register stub', received: dto };
  }

  login(dto: LoginDto) {
    // TODO: replace with Prisma once schema spike is confirmed
    return { message: 'login stub', received: dto };
  }
}
