import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import { bands } from './bands';
import { timeframes } from './timeframes';
import { stages } from './stages';

@Entity()
export class performances {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => bands)
    @JoinColumn()
    band_id: bands;

    @Column()
    day: number;

    @ManyToOne(() => timeframes)
    @JoinColumn()
    timeframe_id: timeframes;

    @ManyToOne(() => stages)
    @JoinColumn()
    stage_id: stages;


};