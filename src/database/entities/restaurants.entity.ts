import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { locations } from './locations.entity';
import { opening_times } from './opening_times.entity';

@Entity()
export class restaurants {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => locations, {cascade: true, onDelete: 'CASCADE'})
    @JoinColumn()
    location_: number;

    @Column()
    food_type: string;

    @ManyToOne(() => opening_times, {cascade: true, onDelete: 'CASCADE'})
    @JoinColumn()
    opening__times_: number;


};