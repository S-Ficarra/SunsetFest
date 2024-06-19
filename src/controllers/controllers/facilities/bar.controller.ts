import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "src/authentification/jwt-auth.guard";
import { Bar } from "src/domain/models/facility/shop/bar.model";
import { BarService } from "src/services/facility/shop/bar.service";
import { BarDto } from "../../DTO/facilities/bar.dto";
import { mapBarDtoToModel, mapBarDtoToModelEdit } from "../../mappers/facilities/bar.mapper";


@Controller()
export class BarController {


    constructor(private readonly barService: BarService){};


    @UseGuards(JwtAuthGuard)
    @Get('bars')
    async getAllBars(): Promise <Bar[] | {}> {
        try {
            return await this.barService.getAllBars();
        } catch (error) {
            return {message: error.message};
        };
    };


    @UseGuards(JwtAuthGuard)
    @Get('bars/:id')
    async getBarById(@Param('id') id: number): Promise <Bar | {}> {
        try {
            return await this.barService.getBarById(id);
        } catch (error) {
            return {message: error.message};
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('bars/createbar')
    async createBar (@Body(new ValidationPipe()) createBarDto: BarDto): Promise <Bar | {}> {

        try {
            const barToCreate = mapBarDtoToModel(createBarDto);
            const barCreated = await this.barService.createBar(barToCreate);
            return barCreated;
        } catch (error) {
            return {message: error.message};
        };

    };


    @UseGuards(JwtAuthGuard)
    @Post('bars/:id/editbar')
    async editBar (
        @Param('id') id: number, 
        @Body(new ValidationPipe()) editBarDto: BarDto): Promise<Bar | {}> {

            try {
                const barToEdit = await this.barService.getBarById(id);
                const mappedBarToEdit = mapBarDtoToModelEdit(barToEdit, editBarDto);
                const barEdited = await this.barService.editBar(mappedBarToEdit);
                return barEdited;
            } catch (error) {
                return {message: error.message};
            };
        };


    @UseGuards(JwtAuthGuard)
    @Post('bars/:id/deletebar')
    async deleteBar(@Param('id') id: number): Promise<{}> {

        try {
            const barToDelete = await this.barService.getBarById(id);
            
            if (!barToDelete) {
                return {message: `Bar ${id} do not exist`};
            };

            await this.barService.deleteBar(id);
            return {message: `Bar ${id} deleted`};   

        } catch (error) {
            return {message: error.message};
        };
    };

    
};