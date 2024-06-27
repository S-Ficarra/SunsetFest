import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { performances } from './performances.entity';

@Entity()
export class programs {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: false})
    year: number;

    @ManyToOne(() => performances, {nullable: true})
    @JoinColumn({ name: 'performance_id' })
    performance_: performances;

    @Column({ nullable: true })
    performance_id: number;
    

};