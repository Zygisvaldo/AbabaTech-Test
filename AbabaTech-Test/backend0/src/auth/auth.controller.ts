import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.register(authCredentialsDto);
  }

  @Post('login')
  async login(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(authCredentialsDto);
  }
}
