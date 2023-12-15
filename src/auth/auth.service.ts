import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthRepository, User } from './auth.repository';
import { v4 } from 'uuid';
import { EmailService } from './email.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload-interface';
import { LoginUserDto } from './dtos/login-user.dto';
import { Types } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
// eslint-disable-next-line @typescript-eslint/no-var-requires

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private emailService: EmailService,
    private jwtService: JwtService,
  ) {}

  async registerUser(body: CreateUserDto) {
    const { email, password, userName } = body;

    if (!email || !password || !userName) {
      throw new BadRequestException('invalid request body');
    }

    const user: User = await this.authRepository.findUser(email);
    if (user) {
      throw new BadRequestException('email in use');
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = v4();

    const newUser = await this.authRepository.createUser({
      email,
      userName,
      password: hashPassword,
      verificationToken,
    });

    const jwtPayload: JwtPayload = { email, id: newUser._id };
    const token = this.jwtService.sign(jwtPayload, {
      secret: process.env.SECRET_KEY,
    });

    this.authRepository.updateUserToken(newUser._id, token);

    const verifyEmail = this.emailService.registrationsConfirm(email, userName);
    this.emailService.sendEmail(verifyEmail);

    newUser.password = undefined;
    newUser.token = undefined;
    newUser._id = undefined;

    return { status: 201, message: 'success', user: newUser, token };
  }

  async loginUser(body: LoginUserDto) {
    const { email, password } = body;
    const user = await this.authRepository.findUser(email);
    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!user || !passwordCompare) {
      throw new NotFoundException('Email or password is wrong');
    }

    try {
      this.jwtService.verify(user.token, { secret: process.env.SECRET_KEY });
    } catch (error) {
      const jwtPayload: JwtPayload = { email, id: user._id };
      user.token = this.jwtService.sign(jwtPayload, {
        secret: process.env.SECRET_KEY,
      });
      user.save();
      // await this.authRepository.updateUserToken(user._id, token);
    }
    const token = user.token;
    user.password = undefined;
    user.token = undefined;
    user._id = undefined;

    return { status: 200, message: 'success', user, token };
  }

  async logOutUser(id: Types.ObjectId) {
    await this.authRepository.updateUserToken(id, '');
    return { status: 204, message: 'no content' };
  }
}
