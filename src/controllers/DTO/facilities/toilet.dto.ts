import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class ToiletDto {

    @IsString()
    name: string;

    @IsNumber()
    @Type(() => Number)
    latitude: number;

    @IsNumber()
    @Type(() => Number)
    longitude: number;

};