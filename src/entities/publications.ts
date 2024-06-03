import { Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import { publication_contents } from './publication_contents';
import { publication_details } from './publication_details';
import { publication_types } from './publication_types';
import { images } from './images';


@Entity()
export class publications {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => publication_contents)
    @JoinColumn()
    publication_contents_id: publication_contents;

    @ManyToOne(() => publication_details)
    @JoinColumn()
    publication_details_id: publication_details;

    @ManyToOne(() => publication_types)
    @JoinColumn()
    publication_types_id: publication_types;

    @ManyToOne(() => images, { nullable: true })
    @JoinColumn()
    images_id: images | null;


};