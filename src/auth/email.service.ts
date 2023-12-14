import { Injectable } from '@nestjs/common';
import * as templates from './templates';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
  async sendEmail(date) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const email = { ...date, from: 'sanjaksms@gmail.com' };
    try {
      await sgMail.send(email);
      return true;
    } catch (error) {
      return false;
    }
  }

  verifyEmail(email, verificationToken, userName) {
    return {
      to: email,
      subject: 'Verify email',
      html: templates.templateVerificationEmail(
        `${process.env.BASE_URL_FRONT}/verify/${verificationToken}`,
        userName,
      ),
    };
  }

  registrationsConfirm(email, userName) {
    return {
      to: email,
      subject: 'Registry confirm',
      html: templates.templateRegistrationEmail(userName),
    };
  }

  renewPass(email, password, userName) {
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
