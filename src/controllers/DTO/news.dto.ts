import { IsBoolean, IsString } from "class-validator";

export class NewsDto {

    @IsString()
    title: string;

    @IsString()
    text: string;

    @IsString()
    status: boolean;

};