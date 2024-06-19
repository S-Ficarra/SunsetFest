import { Type } from "class-transformer";
import { IsString, IsNumber } from "class-validator";


export class StageDto {
    
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