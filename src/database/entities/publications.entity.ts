import { Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import { publication_contents } from './publication_contents.entity';
import { publication_details } from './publication_details.entity';
import { publication_types } from './publication_types.entity';
import { images } from './images.entity';


@Entity()
export class publications {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => publication_contents, {cascade: true, onDelete: 'CASCADE', eager: true})
    @JoinColumn()
    publication__contents_: publication_contents;

    @ManyToOne(() => publication_details, {cascade: true, onDelete: 'CASCADE', eager: true})
    @JoinColumn()
    publication__details_: publication_details;

    @ManyToOne(() => publication_types, {cascade: true, onDelete: 'CASCADE', eager: true})
    @JoinColumn()
    publication__types_: publication_types;

    @ManyToOne(() => images, { cascade: true, nullable: true, onDelete: 'CASCADE', eager: true})
    @JoinColumn()
    images_: images | null;


};