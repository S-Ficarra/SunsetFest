import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class images {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "blob" })
    image: Blob;

};