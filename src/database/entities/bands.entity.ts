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

    @ManyToOne(() => images)
    @JoinColumn()
    thumbnail__image_: number;

    @ManyToOne(() => images)
    @JoinColumn()
    banner__image_: number;

    @ManyToOne(() => publication_details)
    @JoinColumn()
    publication__details_: number;

};