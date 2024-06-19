import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { locations } from './locations.entity';
import { opening_times } from './opening_times.entity';

@Entity()
export class bars {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => locations, {cascade: true, onDelete: 'CASCADE', eager: true})
    @JoinColumn()
    location_: locations;

    @ManyToOne(() => opening_times, {cascade: true, onDelete: 'CASCADE', eager: true})
    @JoinColumn()
    opening__times_: opening_times;


};