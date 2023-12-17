import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthRepository } from './auth.repository';
import { v4 } from 'uuid';
import { EmailService } from './email.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload-interface';
import { LoginUserDto } from './dtos/login-user.dto';
import { Types } from 'mongoose';
import { User } from './schemas/user.schema';
// import { v2 as cloudinary } from 'cloudinary';
import { UpdateUserDto } from './dtos/update-user.dto';
import { RenewPasswordDto } from './dtos/renew-password.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

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

    const user: User = await this.authRepository.findUserByEmail(email);
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
    // newUser._id = undefined;

    return { status: 201, message: 'success', user: newUser, token };
  }

  async loginUser(body: LoginUserDto) {
    const { email, password } = body;
    const user = await this.authRepository.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException('Email or password is wrong');
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      throw new NotFoundException('Email or password is wrong');
    }

    try {
      this.jwtService.verify(user.token, { secret: process.env.SECRET_KEY });
    } catch (error) {
      const jwtPayload: JwtPayload = { email, id: user._id };
      user.token = this.jwtService.sign(jwtPayload, {
        secret: process.env.SECRET_KEY,
      });
      await this.authRepository.updateUserToken(user._id, user.token);
    }
    const token = user.token;
    user.password = undefined;
    user.token = undefined;
    // user._id = undefined;

    return { status: 200, message: 'success', user, token };
  }

  async logOutUser(id: Types.ObjectId) {
    await this.authRepository.updateUserToken(id, '');
    return { status: 204, message: 'no content' };
  }

  getCurrentUser(user: User) {
    const token = user.token;
    user.token = undefined;
    user.password = undefined;
    return {
      status: 200,
      message: 'success',
      token,
      user,
    };
  }

  async updateUser(
    id: Types.ObjectId,
    body: UpdateUserDto,
    file: Express.Multer.File,
  ) {
    const userToUpdate: Partial<User> = { ...body };

    if (body.email) {
      userToUpdate.verify = false;
    }

    if (file) {
      userToUpdate.avatarURL = 'some path'; //need to find & paste URL to avatar !!!
    }

    const user = await this.authRepository.updateUser(id, userToUpdate);

    user.token = undefined;
    user.password = undefined;
    return {
      status: 200,
      message: 'User updated successfully',
      user,
    };
  }

  async verifyEmail(verificationToken: string) {
    const user =
      await this.authRepository.findUserByVerificationToken(verificationToken);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    let { token } = user;
    const { email, _id } = user;

    try {
      this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY,
      });
    } catch (error) {
      const jwtPayload: JwtPayload = { email, id: _id };
      token = this.jwtService.sign(jwtPayload, {
        secret: process.env.SECRET_KEY,
      });
    }

    await this.authRepository.updateUser(_id, {
      token,
      verificationToken: '',
      verify: true,
    });

    return {
      status: 200,
      message: 'verification successful',
      email,
      token,
      verify: true,
    };
  }

  async sendVerifyEmail(user: User) {
    if (user.verify) {
      throw new BadRequestException('Verification has already been passed');
    }

    const verifyEmail = this.emailService.verifyEmail(
      user.email,
      user.verificationToken,
      user.userName,
    );

    await this.emailService.sendEmail(verifyEmail);

    return {
      status: 200,
      message: 'Verification email sent',
      email: user.email,
    };
  }

  async sendRenewPass({ email }: RenewPasswordDto) {
    const user = await this.authRepository.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const password = v4();
    const hashPassword = await bcrypt.hash(password, 10);

    await this.authRepository.updateUser(user._id, { password: hashPassword });

    const renewEmail = this.emailService.renewPass(
      email,
      password,
      user.userName,
    );

    await this.emailService.sendEmail(renewEmail);

    return { status: 200, message: 'GeneratePassword email sent', email };
  }

  async changePassword({ oldPassword, newPassword }: ChangePasswordDto, user) {
    //type of user extends User???
    const passCompare = await bcrypt.compare(oldPassword, user.password);
    if (!passCompare) {
      throw new UnauthorizedException('wrong password');
    }

    const password = await bcrypt.hash(newPassword, 10);

    await this.authRepository.updateUser(user._id, { password });

    const renewEmail = this.emailService.renewPass(
      user.email,
      newPassword,
      user.userName,
    );

    await this.emailService.sendEmail(renewEmail);

    return {
      status: 200,
      message: 'Password changed',
      email: user.email,
    };
  }
}
