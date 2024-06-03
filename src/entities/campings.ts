import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { locations } from './locations';

@Entity()
export class campings {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    capacity: number;

    @ManyToOne(() => locations)
    @JoinColumn()
    location_id: locations;

};