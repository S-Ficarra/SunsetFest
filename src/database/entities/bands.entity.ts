import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { publication_details } from './publication_details.entity';
import { images } from './images.entity';


@Entity()
export class bands {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    country: string;
    
    @Column({type: 'text'})
    text: string;
    
    @Column()
    facebook: string;
    
    @Column()
    instagram: string;
    
    @Column()
    twitter: string;

    @Column()
    youtube: string;

    @Column()
    spotify: string;

    @Column()
    website: string;

    @Column()
    spotify_integration: string;

    @Column()
    youtube_integration: string;

    @ManyToOne(() => images, {cascade: true, onDelete: 'CASCADE', eager: true})
    @JoinColumn({ name: 'thumbnail_image_id' })
    thumbnail__image_: images;

    @ManyToOne(() => images, {cascade: true, onDelete: 'CASCADE', eager: true})
    @JoinColumn()
    banner__image_: images;

    @ManyToOne(() => publication_details,{cascade: true, onDelete: 'CASCADE', eager: true})
    @JoinColumn({ name: 'publication_details_id' })
    publication__details_: publication_details;

};