import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { performances } from './performances.entity';

@Entity()
export class programs {

    @PrimaryColumn()
    id: number;

    @ManyToOne(() => performances, {nullable: true})
    @JoinColumn()
    performance_: number;

};