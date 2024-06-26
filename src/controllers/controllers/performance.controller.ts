import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "src/authentification/jwt-auth.guard";
import { PerformanceService } from "src/services/program/performance/performance.service";
import { PerformanceDto } from "../DTO/performance.dto";
import { BandService } from "src/services/band/band.service";
import { StageService } from "src/services/facility/stage.service";
import { TimeFrameService } from "src/services/program/performance/timeFrame.service";
import { mapPerformanceDtoToModel, mapPerformanceDtoToModelEdit } from "../mappers/performance.mapper";




@Controller()
export class PerformanceController{

    constructor(
        private readonly perfServices : PerformanceService,
        private readonly bandServices : BandService,
        private readonly stageServices : StageService,
        private readonly timeFrameServices : TimeFrameService
    ){};




    @UseGuards(JwtAuthGuard)
    @Get('performances')
    async getAllPerformances(): Promise <Performance | {}> {
        try {
            return await this.perfServices.getAllPerformances();
        } catch (error) {
            return {message: error.message};
        };
    };


    
    @UseGuards(JwtAuthGuard)
    @Get('performances/:id')
    async getPerformanceById(@Param('id') id: number): Promise <Performance | {}> {

        try {
            return await this.perfServices.getPerformanceById(id);
        } catch (error) {
            return {message: error.message};
        };
        
    };


    @UseGuards(JwtAuthGuard)
    @Post('performances/create')
    async createPerformance(@Body(new ValidationPipe()) createPerfDto: PerformanceDto): Promise <Performance | {}> {

        try {
            const band = await this.bandServices.getBandById(createPerfDto.band);
            const stage = await this.stageServices.getStageById(createPerfDto.stage);
            const timeFrame = await this.timeFrameServices.getTimeFrameById(createPerfDto.timeFrame);
            const perfToSave = mapPerformanceDtoToModel(band, stage, timeFrame);

            return await this.perfServices.createPerformance(perfToSave);

        } catch (error) {
            return {message: error.message};  
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('performances/:id/edit')
    async editPerformance(
        @Param('id') id: number,
        @Body(new ValidationPipe()) editPerfDto: PerformanceDto): Promise <Performance | {}> {

            try {

                const perfToEdit = await this.perfServices.getPerformanceById(id);
                const band = await this.bandServices.getBandById(editPerfDto.band);
                const stage = await this.stageServices.getStageById(editPerfDto.stage);
                const timeFrame = await this.timeFrameServices.getTimeFrameById(editPerfDto.timeFrame);

                const perfEdited = mapPerformanceDtoToModelEdit(perfToEdit, band, stage, timeFrame)
                
                return await this.perfServices.editPerformance(perfEdited);
                
            } catch (error) {
                return {message: error.message};  

            };
        };


    @UseGuards(JwtAuthGuard)
    @Post('performances/:id/delete')
    async deletePerformance(@Param('id') id: number): Promise <{}> {
        try {
            const perfToDelete = await this.perfServices.getPerformanceById(id);

            if (perfToDelete) {
                await this.perfServices.deletePerformance(id)
                return {message: `Performance ${id} deleted`};
            };

            return {message: `Performance ${id} do not exist`};

        } catch (error) {
            return {message: error.message};  
        };
    };


};