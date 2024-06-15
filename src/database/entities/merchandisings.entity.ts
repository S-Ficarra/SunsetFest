import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { locations } from './locations.entity';
import { opening_times } from './opening_times.entity';

@Entity()
export class merchandisings {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => locations, {cascade: true})
    @JoinColumn()
    location_: number;

    @Column()
    merch_type: string;

    @ManyToOne(() => opening_times, {cascade: true})
    @JoinColumn()
    opening__times_: number;


};