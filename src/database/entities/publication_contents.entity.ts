import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class publication_contents {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({type: 'text'})
    text: string;

};