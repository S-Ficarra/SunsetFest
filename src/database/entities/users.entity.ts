import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    first_name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    role: number;

};