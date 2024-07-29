import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe, HttpStatus, Res } from "@nestjs/common";
import { Response } from 'express';
import { JwtAuthGuard } from "../../../authentification/jwt-auth.guard";
import { Bar } from "../../../domain/models/facility/shop/bar.model";
import { BarService } from "../../../services/facility/shop/bar.service";
import { BarDto } from "../../DTO/facilities/bar.dto";
import { mapBarDtoToModel, mapBarDtoToModelEdit } from "../../mappers/facilities/bar.mapper";


@Controller()
export class BarController {


    constructor(private readonly barService: BarService){};


    @Get('bars')
    async getAllBars(@Res() res: Response): Promise <Bar[] | {}> {
        try {
            const allBars = await this.barService.getAllBars();
            return res.status(HttpStatus.OK).send(allBars);

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };


    @Get('bars/:id')
    async getBarById(
        @Param('id') id: number,
        @Res() res: Response): Promise <Bar | {}> {
        try {
            const bar = await this.barService.getBarById(id);
            return res.status(HttpStatus.OK).send(bar);

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('bars/create')
    async createBar (
        @Body(new ValidationPipe()) createBarDto: BarDto,
        @Res() res: Response): Promise <Bar | {}> {

        try {
            const barToCreate = mapBarDtoToModel(createBarDto);
            const barCreated = await this.barService.createBar(barToCreate);
            return res.status(HttpStatus.OK).send(barCreated);

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };

    };


    @UseGuards(JwtAuthGuard)
    @Post('bars/:id/edit')
    async editBar (
        @Param('id') id: number, 
        @Res() res: Response,
        @Body(new ValidationPipe()) editBarDto: BarDto): Promise<Bar | {}> {

            try {
                const barToEdit = await this.barService.getBarById(id);
                const mappedBarToEdit = mapBarDtoToModelEdit(barToEdit, editBarDto);
                const barEdited = await this.barService.editBar(mappedBarToEdit);
                return res.status(HttpStatus.OK).send(barEdited);
            } catch (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
            };
        };


    @UseGuards(JwtAuthGuard)
    @Post('bars/:id/delete')
    async deleteBar(
        @Res() res: Response,
        @Param('id') id: number): Promise<{}> {

        try {
            const barToDelete = await this.barService.getBarById(id);
            
            if (barToDelete) {
                await this.barService.deleteBar(id);
                return res.status(HttpStatus.OK).json({message: `Bar ${id} deleted`});
            };

            return res.status(HttpStatus.BAD_REQUEST).json({message: `Bar ${id} do not exist`});

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});         
        };
    };

    
};