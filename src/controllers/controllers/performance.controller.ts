import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe, HttpStatus, Res  } from "@nestjs/common";
import { Response } from 'express';
import { JwtAuthGuard } from "../../authentification/jwt-auth.guard";
import { PerformanceService } from "../../services/program/performance/performance.service";
import { PerformanceDto } from "../DTO/performance.dto";
import { BandService } from "../../services/band/band.service";
import { StageService } from "../../services/facility/stage.service";
import { TimeFrameService } from "../../services/program/performance/timeFrame.service";
import { mapPerformanceDtoToModel, mapPerformanceDtoToModelEdit } from "../mappers/performance.mapper";




@Controller()
export class PerformanceController{

    constructor(
        private readonly perfServices : PerformanceService,
        private readonly bandServices : BandService,
        private readonly stageServices : StageService,
        private readonly timeFrameServices : TimeFrameService
    ){};




    @Get('performances')
    async getAllPerformances(@Res() res: Response): Promise <Performance | {}> {
        try {
            const allPerfs = await this.perfServices.getAllPerformances();
            return res.status(HttpStatus.OK).send(allPerfs);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };


    
    @Get('performances/:id')
    async getPerformanceById(
        @Res() res: Response,
        @Param('id') id: number): Promise <Performance | {}> {

        try {
            const perf = await this.perfServices.getPerformanceById(id);
            return res.status(HttpStatus.OK).send(perf);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
        
    };


    @UseGuards(JwtAuthGuard)
    @Post('performances/create')
    async createPerformance(
        @Res() res: Response,
        @Body(new ValidationPipe()) createPerfDto: PerformanceDto): Promise <Performance | {}> {

        try {
            const band = await this.bandServices.getBandById(createPerfDto.band);
            const stage = await this.stageServices.getStageById(createPerfDto.stage);
            const timeFrame = await this.timeFrameServices.getTimeFrameById(createPerfDto.timeFrame);
            const perfToSave = mapPerformanceDtoToModel(band, stage, timeFrame);
            const perfCreated = await this.perfServices.createPerformance(perfToSave);

            return res.status(HttpStatus.OK).send(perfCreated);

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('performances/:id/edit')
    async editPerformance(
        @Res() res: Response,
        @Param('id') id: number,
        @Body(new ValidationPipe()) editPerfDto: PerformanceDto): Promise <Performance | {}> {

            try {

                const perfToEdit = await this.perfServices.getPerformanceById(id);
                const band = await this.bandServices.getBandById(editPerfDto.band);
                const stage = await this.stageServices.getStageById(editPerfDto.stage);
                const timeFrame = await this.timeFrameServices.getTimeFrameById(editPerfDto.timeFrame);
                const perfEditedToSave = mapPerformanceDtoToModelEdit(perfToEdit, band, stage, timeFrame)
                const perfEdited = await this.perfServices.editPerformance(perfEditedToSave);

                return res.status(HttpStatus.OK).send(perfEdited);
                
            } catch (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
            };
        };


    @UseGuards(JwtAuthGuard)
    @Post('performances/:id/delete')
    async deletePerformance(
        @Res() res: Response,
        @Param('id') id: number): Promise <{}> {
        try {
            const perfToDelete = await this.perfServices.getPerformanceById(id);

            if (perfToDelete) {
                await this.perfServices.deletePerformance(id)
                return res.status(HttpStatus.OK).json({message: `Performance ${id} deleted`});
            };

            return res.status(HttpStatus.BAD_REQUEST).json({message: `Performance ${id} do not exist`});

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});         
        };
    };


};