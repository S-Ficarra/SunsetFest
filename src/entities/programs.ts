import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { performances } from './performances';

@Entity()
export class programs {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => performances)
    @JoinColumn()
    performance_id: performances;

};