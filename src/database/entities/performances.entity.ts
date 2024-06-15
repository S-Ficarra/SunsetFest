import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import { bands } from './bands.entity';
import { timeframes } from './timeframes.entity';
import { stages } from './stages.entity';

@Entity()
export class performances {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => bands)
    @JoinColumn()
    band_: number;

    @Column()
    day: string;

    @ManyToOne(() => timeframes)
    @JoinColumn()
    timeframe_: number;

    @ManyToOne(() => stages)
    @JoinColumn()
    stage_: number;


};