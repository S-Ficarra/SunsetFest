import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class publication_types {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

};