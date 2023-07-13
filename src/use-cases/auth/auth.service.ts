import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private TIME_EXPIRATION_ACCESS_TOKEN = '3d';
  private TIME_EXPIRATION_REFRESH_TOKEN = '30d';

  async login(user) {
    const tokens = await this.getTokens(user.id, user.email, user.roles);
    return tokens;
  }

  async getTokens(userId: string, email: string, roles: string[]) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
          roles: roles,
        },
        {
          expiresIn: this.TIME_EXPIRATION_ACCESS_TOKEN,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
          roles: roles,
        },
        {
          expiresIn: this.TIME_EXPIRATION_REFRESH_TOKEN,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateUser(email: string, password: string) {
    console.log(email);
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid email');
    }

    const isValidPassword = compareSync(password, user.password);
    if (!isValidPassword) {
      throw new BadRequestException('Invalid password');
    }

    return user;
  }
}