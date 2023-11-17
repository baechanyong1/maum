import { Module } from '@nestjs/common';
import { CompletedService } from './completed.service';
import { CompletedResolver } from './completed.resolver';

@Module({
  providers: [CompletedResolver, CompletedService]
})
export class CompletedModule {}
