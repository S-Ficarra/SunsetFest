import { Body, Controller, Get, Post, Param, UseGuards, Req, ValidationPipe, HttpStatus, Res } from "@nestjs/common";
import { Response } from 'express';
import { AuthentificationService } from "../../authentification/authentification.service";
import { JwtAuthGuard } from "../../authentification/jwt-auth.guard";
import { Program } from "../../domain/models/program/program.model";
import { ProgramService } from "../../services/program/program.service";
import { ProgramDto } from "../DTO/program.dto";
import { PerformanceService } from "../../services/program/performance/performance.service";



@Controller()
export class ProgramController {


    constructor (
        private readonly programServices : ProgramService,
        private readonly perfServices: PerformanceService,
        private readonly authServices : AuthentificationService
    ){};



    @Get('programs/:year')
    async getProgramByYear(
        @Param('year') year: number,
        @Res() res: Response): Promise <Program | {}> {

        try {      
            const program = await this.programServices.getProgramByYear(year);
            return res.status(HttpStatus.OK).send(program);
            
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };

 
    @UseGuards(JwtAuthGuard)
    @Post('programs/:year/addperformance')
    async addPerformanceToProgram(
        @Req() req: Request,
        @Res() res: Response,
        @Param('year') year: number,
        @Body(new ValidationPipe()) programDto: ProgramDto): Promise <Program | {}> {
        try {

            const userLogged = await this.authServices.getUserLogged(req);
            const performanceToAddId = parseInt(programDto.performanceId)
            
            const perfToAdd = await this.perfServices.getPerformanceById(performanceToAddId);
        
            const performanceAdded = await this.programServices.addPerformanceToProgram(userLogged, year, perfToAdd);
            return res.status(HttpStatus.OK).json(performanceAdded);


        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({message : error.message});  
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('programs/:year/deleteperformance')
    async deletePerformanceFromProgram(
        @Req() req: Request,
        @Res() res: Response,
        @Param('year') year: number,
        @Body(new ValidationPipe()) programDto: ProgramDto): Promise <{}> {           

            try {
                const userLogged = await this.authServices.getUserLogged(req);
                const performanceToDeleteId = parseInt(programDto.performanceId)               
                const perf = await this.programServices.findPerformanceInProgram(year, performanceToDeleteId);

                if (perf) {
                    await this.programServices.deletePerformanceFromProgram(userLogged, year, performanceToDeleteId);
                    return res.status(HttpStatus.OK).json({message:`Performance ${performanceToDeleteId} removed from program ${year}`});
                };
                                
                return res.status(HttpStatus.BAD_REQUEST).json({message: `Performance ${performanceToDeleteId} do not exist in program ${year}`});

            } catch (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});         
            };
        };



};