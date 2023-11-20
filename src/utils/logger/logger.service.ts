import { Injectable, Scope  } from '@nestjs/common';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { MailService } from './mail/mail.service';

@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor() {
    const sendMailOnErrorFormat = winston.format((info) => {
      if (info.level === 'error') {
        MailService.sendErrorMail('Error Log', `${info.message}\n\n${info.stack}`);
      }
      return info;
    });

    this.logger = winston.createLogger({
      level: 'error',
      format: winston.format.combine(
        sendMailOnErrorFormat(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
          filename: 'logs/%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
    });
  }

  async log(message: string) {
    this.logger.info(message);
  }
  error(message: string) {
    const trace = new Error().stack;
    this.logger.error({ message, trace });
    MailService.sendErrorMail('Error Log', `${message}\n\n${trace}`);
  }
}
