import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class opening_times {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    opening_time: Date;

    @Column()
    closing_time: Date;

};