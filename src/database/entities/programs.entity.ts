import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { performances } from './performances.entity';

@Entity()
export class programs {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => performances)
    @JoinColumn()
    performance_: number;

};