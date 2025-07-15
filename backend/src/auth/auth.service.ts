import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateAdmin(username: string, pass: string): Promise<any> {
    const admin = await this.prisma.admin.findUnique({
      where: { username },
    });
    
    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const isPasswordValid = await bcrypt.compare(pass, admin.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const { password, ...result } = admin;
    return result;
  }

  async login(username: string, password: string) {
    const admin = await this.validateAdmin(username, password);
    
    const payload = { username: admin.username, sub: admin.id };
    
    return {
      access_token: this.jwtService.sign(payload),
      admin: {
        id: admin.id,
        username: admin.username,
      },
    };
  }

  async createAdmin(username: string, password: string) {
    const existingAdmin = await this.prisma.admin.findUnique({
      where: { username },
    });

    if (existingAdmin) {
      throw new Error('Admin with this username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await this.prisma.admin.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    const { password: _, ...result } = admin;
    return result;
  }

  async getAdminCount(): Promise<number> {
    return await this.prisma.admin.count();
  }
} 