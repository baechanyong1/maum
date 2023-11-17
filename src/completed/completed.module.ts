import { Module } from '@nestjs/common';
import { CompletedService } from './completed.service';
import { CompletedResolver } from './completed.resolver';
import { Completed } from './entities/completed.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Completed])],
  providers: [CompletedResolver, CompletedService],
})
export class CompletedModule {}
