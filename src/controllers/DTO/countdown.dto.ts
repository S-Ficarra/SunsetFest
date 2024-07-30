import { IsString } from "class-validator";


export class CountdownDto {

    @IsString()
    name: string;

    @IsString()
    endingTime: string;

};