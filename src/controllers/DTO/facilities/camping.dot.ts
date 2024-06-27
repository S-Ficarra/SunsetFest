import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";


export class CampingDto {

    @IsString()
    name: string;

    @IsNumber()
    @Type(() => Number)
    capacity: number;

    @IsNumber()
    @Type(() => Number)
    latitude: number;

    @IsNumber()
    @Type(() => Number)
    longitude: number;

};