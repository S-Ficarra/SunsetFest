import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { locations } from './locations';

@Entity()
export class stages {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => locations)
    @JoinColumn()
    location_id: locations;

    @Column()
    capacity: number;

};