import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe, HttpStatus, Res } from "@nestjs/common";
import { Response } from 'express';
import { JwtAuthGuard } from "../../../authentification/jwt-auth.guard";
import { Toilet } from "../../../domain/models/facility/toilet.model";
import { ToiletService } from "../../../services/facility/toilet.service";
import { ToiletDto } from "../../DTO/facilities/toilet.dto";
import { mapToiletDtoToModelCreate, mapToiletDtoToModelEdit } from "../../mappers/facilities/toilet.mapper";


@Controller()
export class ToiletController {

    constructor (
        private readonly toiletServices : ToiletService
    ){};


    @Get('toilets')
    async getAllToilets(@Res() res: Response): Promise <Toilet[] | {}> {
        try {
            const allToilets = await this.toiletServices.getAllToilets()
            return res.status(HttpStatus.OK).send(allToilets);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };

    @Get('toilets/:id')
    async getToiletById(
        @Res() res: Response,
        @Param('id') id: number): Promise <Toilet | {}> {
        try {
            const toilet = await this.toiletServices.getToiletById(id);
            return res.status(HttpStatus.OK).send(toilet);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('toilets/create')
    async createToilet(
        @Res() res: Response,
        @Body(new ValidationPipe()) createToiletDto : ToiletDto): Promise<Toilet | {}> {

        try {
            const toiletToCreate = mapToiletDtoToModelCreate(createToiletDto);
            const toiletCreated = await this.toiletServices.createToilet(toiletToCreate);
            return res.status(HttpStatus.OK).send(toiletCreated);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    }; 


    @UseGuards(JwtAuthGuard)
    @Post('toilets/:id/edit')
    async editToilet(
        @Res() res: Response,
        @Param('id') id: number,
        @Body(new ValidationPipe()) editToiletDto: ToiletDto): Promise<Toilet | {}> {

        try {
            const toiletToEdit = await this.toiletServices.getToiletById(id);
            const mappedToiletToEdit = mapToiletDtoToModelEdit(toiletToEdit, editToiletDto);
            const toiletEdited = await this.toiletServices.editToilet(mappedToiletToEdit)
            return res.status(HttpStatus.OK).send(toiletEdited);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };

    };


    @UseGuards(JwtAuthGuard)
    @Post('toilets/:id/delete')
    async deleteToilet(
        @Res() res: Response,
        @Param('id') id: number): Promise<{}> {
        try {
            const toiletId = id;
            const toilet = await this.toiletServices.getToiletById(toiletId);
            
            if (toilet) {
                await this.toiletServices.deleteToilet(toiletId);
                return res.status(HttpStatus.OK).json({message: `Toilet ${toiletId} deleted`});
            };

            return res.status(HttpStatus.BAD_REQUEST).json({message: `Toilet ${toiletId} do not exist`});

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});         
        };
    };

};
