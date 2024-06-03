import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class timeframes {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    starting_time: Date;

    @Column()
    ending_time: Date;

};