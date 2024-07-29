import { Controller, UseGuards, Get, Param, Post, Body, ValidationPipe, HttpStatus, Res } from "@nestjs/common";
import { Response } from 'express';
import { JwtAuthGuard } from "../../../authentification/jwt-auth.guard";
import { Stage } from "../../../domain/models/facility/stage.model";
import { StageService } from "../../../services/facility/stage.service";
import { StageDto } from "../../DTO/facilities/stage.dto";
import { mapStageDtoToModel, mapStageDtoToModelEdit } from "../../mappers/facilities/stage.mapper";



@Controller()
export class StageController {


    constructor(
        private readonly stageService : StageService,
    ){};


    @Get('stages')
    async getAllStages(@Res() res: Response): Promise <Stage[] | {}> {
        try {
            const allStages =  await this.stageService.getAllStages();
            return res.status(HttpStatus.OK).send(allStages);

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };


    @Get('stages/:id')
    async getStageByid(
        @Param('id') id: number,
        @Res() res: Response ): Promise <Stage | {}> {
        try {
            const stage = await this.stageService.getStageById(id);
            return res.status(HttpStatus.OK).send(stage);

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('stages/create')
    async createStage(
        @Body(new ValidationPipe()) createStageDto : StageDto,
        @Res() res: Response): Promise <Stage | {}> {
        try {
            const stageToCreate = mapStageDtoToModel(createStageDto);
            const stageCreated = await this.stageService.createStage(stageToCreate);

            return res.status(HttpStatus.OK).send(stageCreated);

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };

    
    @UseGuards(JwtAuthGuard)
    @Post('stages/:id/edit')
    async editStage(
        @Param('id') id: number,
        @Res() res: Response,
        @Body(new ValidationPipe()) editStageDto: StageDto): Promise <Stage | {}> {
            try {
                const stageToEdit = await this.stageService.getStageById(id);
                const mappedStageToEdit = mapStageDtoToModelEdit(stageToEdit, editStageDto);

                const stageEdited = await this.stageService.editStage(mappedStageToEdit);

                return res.status(HttpStatus.OK).send(stageEdited);

            } catch (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
            };
        };


    @UseGuards(JwtAuthGuard)
    @Post('stages/:id/delete')
    async deleteStage(
        @Param('id') id: number,
        @Res() res: Response): Promise <{}> {
        try {
            const stageToDelete = await this.stageService.getStageById(id);
            
            if (stageToDelete) {
                await this.stageService.deleteStage(id);
                return res.status(HttpStatus.OK).json({message: `Stage ${id} deleted`});
            };

            return res.status(HttpStatus.BAD_REQUEST).json({message: `Stage ${id} do not exist`});

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});         
        };
    };


};