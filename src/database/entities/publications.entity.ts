import { Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import { publication_contents } from './publication_contents.entity';
import { publication_details } from './publication_details.entity';
import { publication_types } from './publication_types.entity';
import { images } from './images.entity';


@Entity()
export class publications {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => publication_contents, {cascade: true})
    @JoinColumn()
    publication__contents_: number;

    @ManyToOne(() => publication_details, {cascade: true})
    @JoinColumn()
    publication__details_: number;

    @ManyToOne(() => publication_types, {cascade: true})
    @JoinColumn()
    publication__types_: number;

    @ManyToOne(() => images, { cascade: true, nullable: true })
    @JoinColumn()
    images_: number | null;


};