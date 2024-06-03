import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { users } from './users';

@Entity()
export class publication_details {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => users)
    @JoinColumn()
    author_id: users;

    @Column()
    created_at: Date;

    @Column()
    modified_at: Date;

    @Column({ nullable: true})
    status: boolean | null;


};