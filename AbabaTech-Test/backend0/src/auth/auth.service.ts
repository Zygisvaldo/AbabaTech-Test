import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './auth.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginUserDto } from './login-user.dto';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<void> {
    const user = new User();
    user.username = createUserDto.username;
    user.password = bcrypt.hashSync(createUserDto.password, 8);
    await this.usersRepository.save(user);
  }

  async validateUser(username: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { username: loginUserDto.username } });
    if (user && bcrypt.compareSync(loginUserDto.password, user.password)) {
      const { password, ...result } = user;
      const payload = { username: result.username, sub: result.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
  
}
