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
  @Field(() => Int, { description: 'Example field (placeholder)' })
  @PrimaryGeneratedColumn()
  completedId: number;

  @ManyToOne(() => Questionnaire)
  @JoinColumn({ name: 'questionnaireId' })
  questionnaire: Questionnaire;

  @Field(()=>String)
  @Column()
  question: string;

  @Field(() => Int)
  @Column()
  total: number;
}
