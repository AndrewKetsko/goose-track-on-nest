import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthRepository, User } from './auth.repository';
import { v4 } from 'uuid';
import { EmailService } from './email.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private emailService: EmailService,
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
    const jwtPayload = { email, id: newUser._id };
    const token = jwt.sign(jwtPayload, process.env.SECRET_KEY, {
      expiresIn: '23h',
    });

    this.authRepository.updateUserToken(newUser._id, token);

    const verifyEmail = this.emailService.registrationsConfirm(email, userName);
    this.emailService.sendEmail(verifyEmail);

    return { status: 201, message: 'success', user: newUser, token };
  }
}
