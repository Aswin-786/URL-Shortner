import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { LoginUpDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  SignUp(@Body() SignUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(SignUpDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginUpDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Get('logout')
  logout(): { message: string } {
    return { message: 'User logged out' };
  }
}
