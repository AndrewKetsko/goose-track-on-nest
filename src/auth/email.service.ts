import { Injectable } from '@nestjs/common';
import * as templates from './templates';
import * as sgMail from '@sendgrid/mail';

export interface Email {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  async sendEmail(data: Email): Promise<boolean> {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const email = { ...data, from: 'sanjaksms@gmail.com' };
    try {
      await sgMail.send(email);
      return true;
    } catch (error) {
      return false;
    }
  }

  verifyEmail(
    email: string,
    verificationToken: string,
    userName: string,
  ): Email {
    return {
      to: email,
      subject: 'Verify email',
      html: templates.templateVerificationEmail(
        `${process.env.BASE_URL_FRONT}/verify/${verificationToken}`,
        userName,
      ),
    };
  }

  registrationsConfirm(email: string, userName: string): Email {
    return {
      to: email,
      subject: 'Registry confirm',
      html: templates.templateRegistrationEmail(userName),
    };
  }

  renewPass(email: string, password: string, userName: string): Email {
    return {
      to: email,
      subject: 'Renew password',
      html: templates.templateRenewPassEmail(
        `${process.env.BASE_URL_FRONT}/login`,
        userName,
        password,
      ),
    };
  }
}
