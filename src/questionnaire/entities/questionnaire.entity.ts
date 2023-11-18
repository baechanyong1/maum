import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Completed } from 'src/completed/entities/completed.entity';
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

    @Field(() => [Question], { nullable: true })
    @OneToMany(() => Question, (question) => question.questionnaire)
    questions: Question[];

    @Field(() => [Completed], { nullable: true })
    @OneToMany(() => Completed, (completed) => completed.questionnaire)
    completed: Completed[];  

    @Field(() => String)
    @Column()
    desc: string;
}
