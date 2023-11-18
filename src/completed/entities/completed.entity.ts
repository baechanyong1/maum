import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
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
  // @JoinColumn({ name: 'questionnaireId' })
  questionnaire: Questionnaire;

  @Field(() => Int)
  @Column()
  @JoinColumn({ name: 'questionnaireId' }) 
  questionnaireId: number;

  @Field(() => [AnswerType])
  @Column('text', { array: true })
  question: AnswerType[];

  @Field(() => Int)
  @Column()
  total: number;
}

@ObjectType()
class AnswerType {
  @Field(() => Int)
  optionId: number;

  @Field(() => Int)
  answerId: number;

  @Field(() => Int)
  point: number;
}
