import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthentificationService } from "src/authentification/authentification.service";
import { JwtAuthGuard } from "src/authentification/jwt-auth.guard";
import { Toilet } from "src/domain/models/facility/toilet.model";
import { ToiletService } from "src/services/facility/toilet.service";
import { ToiletDto } from "./DTO/toilet.dto";
import { mapToiletDtoToModelCreate, mapToiletDtoToModelEdit } from "./mappers/toilet.mapper";


@Controller()
export class ToiletController {

    constructor (
        private readonly toiletServices : ToiletService,
    ){};


    @UseGuards(JwtAuthGuard)
    @Get('toilets')
    async getAllToilets(): Promise <Toilet[] | {}> {
        try {
            return await this.toiletServices.getAllToilets()
        } catch (error) {
            return {message: error.message};
        };
    };

    @UseGuards(JwtAuthGuard)
    @Get('toilets/:id')
    async getToiletById(@Param('id') id: number): Promise <Toilet | {}> {
        try {
            return await this.toiletServices.getToiletById(id);
        } catch (error) {
            return {message: error.message};
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('toilets/createtoilet')
    async createToilet(@Body(new ValidationPipe()) createToiletDto : ToiletDto): Promise<Toilet | {}> {

        try {
            const toiletToCreate = mapToiletDtoToModelCreate(createToiletDto);
            return await this.toiletServices.createToilet(toiletToCreate);
        } catch (error) {
            return {message: error.message};
        };
    }; 


    @UseGuards(JwtAuthGuard)
    @Post('toilets/:id/edittoilet')
    async editToilet(
        @Param('id') id: number,
        @Body(new ValidationPipe()) editToiletDto: ToiletDto): Promise<Toilet | {}> {

        try {
            const toiletToEdit = await this.toiletServices.getToiletById(id);
            const mappedToiletToEdit = mapToiletDtoToModelEdit(toiletToEdit, editToiletDto);
            return await this.toiletServices.editToilet(mappedToiletToEdit)
        } catch (error) {
            return {message: error.message};
        };

    };


    @UseGuards(JwtAuthGuard)
    @Post('toilets/:id/deletetoilet')
    async deleteToilet(@Param('id') id: number): Promise<{}> {
        try {
            const toiletId = +id;
            const toilet = await this.toiletServices.getToiletById(toiletId);
            
            if (!toilet) {
                return {message: `Toilet ${toiletId} do not exist`};
            };

            await this.toiletServices.deleteToilet(toiletId);
            return {message: `Toilet ${toiletId} deleted`};
        } catch (error) {
            return {message: error.message};
        };
    };

};
