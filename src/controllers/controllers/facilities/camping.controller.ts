import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe, HttpStatus, Res } from "@nestjs/common";
import { Response } from 'express';
import { JwtAuthGuard } from "../../../authentification/jwt-auth.guard";
import { Camping } from "../../../domain/models/facility/camping.model";
import { CampingService } from "../../../services/facility/camping.service";
import { CampingDto } from "../../DTO/facilities/camping.dot";
import { mapCampingDtoToModelCreate, mapCampingDtoToModelEdit } from "../../mappers/facilities/camping.mapper";


@Controller()
export class CampingController {

    constructor(
        private readonly campingServices : CampingService
    ){};

    @Get('campings')
    async getAllCamping(@Res() res: Response): Promise <Camping[] | {}> {
        try {
            const allCampings = await this.campingServices.getAllCampings()
            return res.status(HttpStatus.OK).send(allCampings);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };


    @Get('campings/:id')
    async getCampingById(
        @Res() res: Response,
        @Param('id') id: number): Promise<Camping | {}> {
        try {
            const camping = await this.campingServices.getCampingById(id);
            return res.status(HttpStatus.OK).send(camping);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('campings/create')
    async createCamping(
        @Res() res: Response,
        @Body(new ValidationPipe()) createCampingDto: CampingDto): Promise<Camping | {}> {
        try {
            const campingToCreate = mapCampingDtoToModelCreate(createCampingDto);
            const campingCreated = await this.campingServices.createCamping(campingToCreate);
            return res.status(HttpStatus.OK).send(campingCreated);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        }
    }; 


    @UseGuards(JwtAuthGuard)
    @Post('campings/:id/edit')
    async editCamping(
        @Res() res: Response,
        @Param('id') id: number,
        @Body(new ValidationPipe()) editCampingDto: CampingDto): Promise <Camping | {}> {
            try {
                const campingToEdit = await this.campingServices.getCampingById(id);
                const mappedCampingToEdit = mapCampingDtoToModelEdit(campingToEdit, editCampingDto);
                const campingEdited = await this.campingServices.editCamping(mappedCampingToEdit);
                return res.status(HttpStatus.OK).send(campingEdited);
            } catch (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
            };
    };


    @UseGuards(JwtAuthGuard)
    @Post('campings/:id/delete')
    async deleteCamping(
        @Res() res: Response,
        @Param('id') id: number): Promise<{}> {
        try {
            const camping = await this.campingServices.getCampingById(id);

            if (camping) {
                await this.campingServices.deleteCamping(id);
                return res.status(HttpStatus.OK).json({message: `Camping ${id} deleted`});
            };
            
            return res.status(HttpStatus.BAD_REQUEST).json({message: `Camping ${id} do not exist`});

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});         
        };
    };


};