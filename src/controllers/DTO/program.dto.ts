import { IsString } from "class-validator";

export class ProgramDto {

    @IsString()
    performanceId: string;

};