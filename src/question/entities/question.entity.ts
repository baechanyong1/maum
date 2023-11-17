import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Completed } from 'src/completed/entities/completed.entity';
import { Option } from 'src/option/entities/option.entity';
import { Questionnaire } from 'src/questionnaire/entities/questionnaire.entity'; 
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'question' })
export class Question {
  @PrimaryGeneratedColumn()
  questionId: number;

  @OneToMany(() => Option, (option) => option.question)
  options: Option[];

  @ManyToOne(() => Questionnaire, (questionnaire) => questionnaire.question)
  @JoinColumn({ name: 'questionnaireId' })
  questionnaire: Questionnaire;

  @Field(()=>String)
  @Column()
  desc: string;
}