import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class locations {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("decimal", { precision: 9, scale: 6 })
    longitude: number;

    @Column("decimal", { precision: 9, scale: 6 })
    latitude: number;

    @Column()
    facility_type: string;

};