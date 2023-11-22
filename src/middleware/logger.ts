import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../utils/logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`Request: ${req.method} ${req.url}`);
    res.on('finish', () => {
      this.logger.log(`Response: ${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent`)
    });
    next();
  }
}
