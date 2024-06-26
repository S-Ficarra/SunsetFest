import { Controller, UseGuards, Get, Param, Post, Body, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "src/authentification/jwt-auth.guard";
import { Stage } from "src/domain/models/facility/stage.model";
import { StageService } from "src/services/facility/stage.service";
import { StageDto } from "../../DTO/facilities/stage.dto";
import { mapStageDtoToModel, mapStageDtoToModelEdit } from "../../mappers/facilities/stage.mapper";





@Controller()
export class StageController {


    constructor(
        private readonly stageService : StageService,
    ){};


    @UseGuards(JwtAuthGuard)
    @Get('stages')
    async getAllStages(): Promise <Stage[] | {}> {
        try {
            return await this.stageService.getAllStages();
        } catch (error) {
            return {message: error.message};            
        };
    };


    @UseGuards(JwtAuthGuard)
    @Get('stages/:id')
    async getStageByid(@Param('id') id: number): Promise <Stage | {}> {
        try {
            return await this.stageService.getStageById(id);
        } catch (error) {
            return {message: error.message};
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('stages/create')
    async createStage(@Body(new ValidationPipe()) createStageDto : StageDto): Promise <Stage | {}> {
        try {
            const stageToCreate = mapStageDtoToModel(createStageDto);
            console.log(stageToCreate);
            
            const stageCreated = await this.stageService.createStage(stageToCreate);
            return stageCreated;
        } catch (error) {
            return {message: error.message};
        };
    };

    
    @UseGuards(JwtAuthGuard)
    @Post('stages/:id/edit')
    async editStage(
        @Param('id') id: number,
        @Body(new ValidationPipe()) editStageDto: StageDto): Promise <Stage | {}> {
            try {
                const stageToEdit = await this.stageService.getStageById(id);
                const mappedStageToEdit = mapStageDtoToModelEdit(stageToEdit, editStageDto);

                return await this.stageService.editStage(mappedStageToEdit);
            } catch (error) {
                return {message: error.message};
            };
        };


    @UseGuards(JwtAuthGuard)
    @Post('stages/:id/delete')
    async deleteStage(@Param('id') id: number): Promise <{}> {
        try {
            const stageToDelete = await this.stageService.getStageById(id);
            
            if (stageToDelete) {
                await this.stageService.deleteStage(id);
                return {message: `Stage ${id} deleted`};
            };

            return {message: `Stage ${id} do not exist`};

        } catch (error) {
            return {message: error.message};
        };
    };


};