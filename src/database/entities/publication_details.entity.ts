import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { users } from './users.entity';

@Entity()
export class publication_details {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    authorId_: number;

    @ManyToOne(() => users, { eager: true })
    @JoinColumn({ name: 'authorId' }) 
    author_: users;

    @Column()
    created_at: Date;

    @Column()
    modified_at: Date;

    @Column({ nullable: true})
    status: boolean | null;
    
};