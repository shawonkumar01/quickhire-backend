import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/user.repository';
import { UserRole } from '../entities/user.entity';

@Injectable()
export class AdminSeed implements OnApplicationBootstrap {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    const email = this.configService.get<string>('ADMIN_EMAIL', 'admin@quickhire.com');
    const password = this.configService.get<string>('ADMIN_PASSWORD', 'admin123');

    // Check if admin already exists
    const existingAdmin = await this.userRepository.findByEmail(email);
    if (existingAdmin) {
      console.log('Admin already exists, skipping seed');
      return;
    }

    // Create admin
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userRepository.create(email, hashedPassword, UserRole.ADMIN);
    console.log(`Admin seeded: ${email}`);
  }
}