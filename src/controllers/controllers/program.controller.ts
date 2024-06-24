import { Body, Controller, Get, Post, Param, UseGuards, Req, ValidationPipe } from "@nestjs/common";
import { AuthentificationService } from "src/authentification/authentification.service";
import { JwtAuthGuard } from "src/authentification/jwt-auth.guard";
import { Program } from "src/domain/models/program/program.model";
import { ProgramService } from "src/services/program/program.service";
import { ProgramDto } from "../DTO/program.dto";
import { PerformanceService } from "src/services/program/performance/performance.service";




@Controller()
export class ProgramController {


    constructor (
        private readonly programServices : ProgramService,
        private readonly perfServices: PerformanceService,
        private readonly authServices : AuthentificationService
    ){};



    @UseGuards(JwtAuthGuard)
    @Get('programs/:year')
    async getProgramByYear(@Param('year') year: number): Promise <Program | {}> {

        try {      
            return await this.programServices.getProgramByYear(year);
        } catch (error) {
            return {message: error.message};
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('programs/:year/addperformance')
    async addPerformanceToProgram(
        @Req() req: Request,
        @Param('year') year: number,
        @Body(new ValidationPipe()) programDto: ProgramDto): Promise <Program | {}> {
        try {

            const userLogged = await this.authServices.getUserLogged(req);
            const performanceToAddId = parseInt(programDto.performanceId)
            
            const perfToAdd = await this.perfServices.getPerformanceById(performanceToAddId);
        
            return await this.programServices.addPerformanceToProgram(userLogged, year, perfToAdd);

        } catch (error) {
            return {message: error.message};
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('programs/:year/deleteperformance')
    async deletePerformanceFromProgram(
        @Req() req: Request,
        @Param('year') year: number,
        @Body(new ValidationPipe()) programDto: ProgramDto): Promise <{}> {

            try {
                const userLogged = await this.authServices.getUserLogged(req);
                const performanceToDeleteId = parseInt(programDto.performanceId)
                
                const perf = await this.programServices.findPerformanceInProgram(year, performanceToDeleteId);

                if (!perf) {
                    return {message: `Performance ${performanceToDeleteId} do not exist in program ${year}`};
                };
                                
                await this.programServices.deletePerformanceFromProgram(userLogged, year, performanceToDeleteId);
                return {message: `Performance ${performanceToDeleteId} removed from program ${year}`};

            } catch (error) {
                return {message: error.message};
            }

        };







  

















};