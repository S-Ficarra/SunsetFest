import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { locations } from './locations.entity';

@Entity()
export class toilets {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => locations, {cascade: true, onDelete: 'CASCADE', eager: true})
    @JoinColumn()
    location_: locations;

};