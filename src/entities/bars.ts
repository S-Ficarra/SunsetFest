import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { locations } from './locations';
import { opening_times } from './opening_times';

@Entity()
export class bars {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => locations)
    @JoinColumn()
    location_id: locations;

    @ManyToOne(() => opening_times)
    @JoinColumn()
    opening_times_id: opening_times;


};