import { IsString } from "class-validator";

export class IllustratedDto {

    @IsString()
    title: string;

    @IsString()
    text: string;

    @IsString()
    status: string;

};