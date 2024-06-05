import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class countdowns {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    starting_time: Date;

    @Column()
    ending_time: Date;

};