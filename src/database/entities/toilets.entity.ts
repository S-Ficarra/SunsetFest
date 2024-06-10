import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { locations } from './locations.entity';

@Entity()
export class toilets {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => locations, {cascade: true})
    @JoinColumn()
    location_: number;

};