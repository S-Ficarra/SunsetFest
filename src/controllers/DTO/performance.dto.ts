import { IsString } from "class-validator";



export class PerformanceDto {

    @IsString()
    band: number;

    @IsString()
    stage: number;

    @IsString()
    timeFrame: number;

};