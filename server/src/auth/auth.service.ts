import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log('Validating user:', username);
    const user = await this.userService.findByUsername(username);
    if (!user) {
      console.log('User not found');
      return null;
    }
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password');
      return null;
    }
    console.log('User validated successfully');
    return { _id: user._id, username: user.username };
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    console.log('Creating token with payload:', payload);
    return {
      access_token: this.jwtService.sign(payload),
      user: user._id,
    };
  }
}
