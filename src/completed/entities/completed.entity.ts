import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Questionnaire } from 'src/questionnaire/entities/questionnaire.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'completed' })
export class Completed {
  @Field(() => Int, { description: '예시 필드 (플레이스홀더)' })
  @PrimaryGeneratedColumn()
  completedId: number;

  @ManyToOne(() => Questionnaire)
  questionnaire: Questionnaire;

  @Field(() => Int)
  @Column()
  @JoinColumn({ name: 'questionnaireId' }) 
  questionnaireId: number;

  @Field(() => [AnswerType])
  @Column('json')
  question: AnswerType[];

  @Field(() => Int)
  @Column()
  total: number;
}

@ObjectType()
export class AnswerType {
  @Field(() => Int, { nullable: true })
  optionId: number;

  @Field(() => Int, { nullable: true })
  answerId: number;

  @Field(() => Int, { nullable: true })
  point: number;
}
