import { IsDate, IsString } from "class-validator";


export class CountdownDto {

    @IsString()
    name: string;

    @IsString()
    startingTime: string;

    @IsString()
    endingTime: string;

};