import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { locations } from './locations.entity';

@Entity()
export class stages {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => locations, {cascade: true, onDelete: 'CASCADE'})
    @JoinColumn()
    location_: number;

    @Column()
    capacity: number;

};