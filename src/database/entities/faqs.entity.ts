import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { publication_details } from './publication_details.entity';

@Entity()
export class faqs {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    question: string;

    @Column()
    answer: string;

    @OneToOne(() => publication_details, {cascade: true, eager: true})
    @JoinColumn()
    publication__details_: publication_details;

};