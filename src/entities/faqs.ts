import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { publication_details } from './publication_details';

@Entity()
export class faqs {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    question: string;

    @Column()
    answer: string;

    @OneToOne(() => publication_details)
    @JoinColumn()
    publication_details_id: publication_details;

};