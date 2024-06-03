import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { publication_details } from './publication_details';
import { images } from './images';


@Entity()
export class bands {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    country: string;
    
    @Column()
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

    @ManyToOne(() => images)
    @JoinColumn()
    thumbnail_image_id: images;

    @ManyToOne(() => images)
    @JoinColumn()
    banner_image_id: images;

    @ManyToOne(() => publication_details)
    @JoinColumn()
    publication_details_id: publication_details;

};