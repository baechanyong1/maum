import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Question } from 'src/question/entities/question.entity';  
import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @ObjectType()
  @Entity({ name: 'questionnaire' })
  export class Questionnaire {
    @Field(() => Int, { description: 'Example field (placeholder)' })
    @PrimaryGeneratedColumn()
    questionnaireId: number;

    @OneToMany(() => Question, (question) => question.questionnaire)
    question: Question[];

    @Field(()=>String)
    @Column()
    desc : string;
  }
