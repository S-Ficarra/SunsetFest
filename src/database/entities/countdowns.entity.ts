import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class countdowns {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    ending_time: Date;

};