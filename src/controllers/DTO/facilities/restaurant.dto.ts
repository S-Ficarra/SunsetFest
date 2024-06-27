import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";


export class RestaurantDto {

    @IsString()
    name: string;

    @IsNumber()
    @Type(() => Number)
    latitude: number;

    @IsNumber()
    @Type(() => Number)
    longitude: number;

    @IsString()
    openingTime: string;

    @IsString()
    closingTime: string;

    @IsString()
    foodType: string;

};