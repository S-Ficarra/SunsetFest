import { Type } from "class-transformer";
import { IsString, IsNumber } from "class-validator";


export class VipDto {

    @IsString()
    name: string;

    @IsNumber()
    @Type(() => Number)
    latitude: number;

    @IsNumber()
    @Type(() => Number)
    longitude: number;

};