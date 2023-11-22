import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Response } from 'express';
import { LoggerService } from '../utils/logger/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(@Inject(LoggerService) private readonly logger: LoggerService) {}

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception.message || 'Internal Server Error';
    const stack = exception.stack;
    console.error(message);

    // Log the error using your logger service
    this.logger.error(message);

    // Send error email only if it's a specific condition (example: 500 status code)
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      try {
        // Send error email
        this.logger.error(`Sending error email for: ${message}`);
        // 여기서 필요한 경우에 따라 이메일을 보낼 수 있습니다.
      } catch (emailError) {
        // Log the email sending error
        this.logger.error(`Error sending email: ${emailError.message}`);
      }
    }

    response.status(status).json({
      statusCode: status,
      message: 'Internal Server Error',
      error: 'Internal Server Error',
    });
  }
}

