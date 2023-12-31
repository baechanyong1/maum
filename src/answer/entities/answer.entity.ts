import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Option } from 'src/option/entities/option.entity';

import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@ObjectType()
@Entity({name: 'answer'})
export class Answer {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  answerId: number;

  @Field(() => [Option], {nullable:true})
  @ManyToOne(()=> Option, (option) => option.answers)
  @JoinColumn({ name : 'optionId'})
  option: Option

  @Field(()=>String)
  @Column()
  desc: string;

  @Field()
  optionId:number

  @Field(() => Int)
  @Column() 
  point: number;
}
