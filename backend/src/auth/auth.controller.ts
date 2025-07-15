import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from './dto/create-admin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto.username, loginDto.password);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('admin')
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    try {
      // Check if there are any existing admins
      const adminCount = await this.authService.getAdminCount();
      
      // If there are already admins, don't allow creating more through this endpoint
      if (adminCount > 0) {
        throw new HttpException('Admin creation is disabled', HttpStatus.FORBIDDEN);
      }
      
      return await this.authService.createAdmin(
        createAdminDto.username,
        createAdminDto.password,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Could not create admin',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('check')
  async checkAdminExists() {
    const adminCount = await this.authService.getAdminCount();
    return { exists: adminCount > 0 };
  }
} 