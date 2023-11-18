import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Answer } from 'src/answer/entities/answer.entity';
import { Question } from 'src/question/entities/question.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'option' })
export class Option {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  @PrimaryGeneratedColumn()
  optionId: number;

  @Field(() => [Question], {nullable:true})
  @ManyToOne(() => Question, (question) => question.options)
  @JoinColumn({ name: 'questionId' })
  question: Question;

  @Field(() => [Answer], { nullable : true})
  @OneToMany(() => Answer, (answer) => answer.option)
  answers: Answer[];

  @Field(() => String)
  @Column()
  desc: string;
}
