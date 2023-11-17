import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionResolver } from './option.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from 'src/option/entities/option.entity'

@Module({
  imports: [ TypeOrmModule.forFeature([Option])],
  providers: [OptionResolver, OptionService],
})
export class OptionModule {}