import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { locations } from './locations';

@Entity()
export class toilets {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => locations)
    @JoinColumn()
    location_id: locations;

};