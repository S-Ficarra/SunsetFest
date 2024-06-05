import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { users } from './users.entity';

@Entity()
export class publication_details {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => users)
    @JoinColumn()
    author_: number;

    @Column()
    created_at: Date;

    @Column()
    modified_at: Date;

    @Column({ nullable: true})
    status: boolean | null;


};