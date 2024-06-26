import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { locations } from './locations.entity';

@Entity()
export class campings {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    capacity: number;

    @ManyToOne(() => locations, {cascade: true, onDelete: 'CASCADE', eager: true})
    @JoinColumn()
    location_: locations;

};