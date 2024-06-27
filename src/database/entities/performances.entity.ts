import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import { bands } from './bands.entity';
import { timeframes } from './timeframes.entity';
import { stages } from './stages.entity';

@Entity()
export class performances {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => bands, {eager: true})
    @JoinColumn()
    band_: bands;

    @ManyToOne(() => timeframes, {eager: true})
    @JoinColumn()
    timeframe_: timeframes;

    @ManyToOne(() => stages, {eager: true})
    @JoinColumn()
    stage_: stages;


};