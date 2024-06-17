import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "src/authentification/jwt-auth.guard";
import { Camping } from "src/domain/models/facility/camping.model";
import { CampingService } from "src/services/facility/camping.service";
import { CampingDto } from "./DTO/camping.dot";
import { mapCampingDtoToModelCreate, mapCampingDtoToModelEdit } from "./mappers/camping.mapper";


@Controller()
export class CampingController {

    constructor(
        private readonly campingServices : CampingService
    ){};

    @UseGuards(JwtAuthGuard)
    @Get('campings')
    async getAllCamping(): Promise <Camping[] | {}> {
        try {
            return await this.campingServices.getAllCampings()
        } catch (error) {
            return {message: error.message};
        };
    };


    @UseGuards(JwtAuthGuard)
    @Get('campings/:id')
    async getCampingById(@Param('id') id: number): Promise<Camping | {}> {
        try {
            return await this.campingServices.getCampingById(id);
        } catch (error) {
            return {message: error.message};
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('campings/createcamping')
    async createCamping(@Body(new ValidationPipe()) createCampingDto: CampingDto): Promise<Camping | {}> {
        try {
            const campingToCreate = mapCampingDtoToModelCreate(createCampingDto);
            const campingCreated = await this.campingServices.createCamping(campingToCreate);
            return campingCreated;
        } catch (error) {
            return {message: error.message};
        }
    }; 


    @UseGuards(JwtAuthGuard)
    @Post('campings/:id/editcamping')
    async editCamping(
        @Param('id') id: number,
        @Body(new ValidationPipe()) editCampingDto: CampingDto): Promise <Camping | {}> {
            try {
                const campingToEdit = await this.campingServices.getCampingById(id);
                const mappedCampingToEdit = mapCampingDtoToModelEdit(campingToEdit, editCampingDto);
                const campingEdited = await this.campingServices.editCamping(mappedCampingToEdit);
                return campingEdited;
            } catch (error) {
                return {message: error.message};
            };
    };


    @UseGuards(JwtAuthGuard)
    @Post('campings/:id/deletecamping')
    async deleteCamping(@Param('id') id: number): Promise<{}> {
        try {
            const camping = await this.campingServices.getCampingById(id);

            if (!camping) {
                return {message: `Camping ${id} do not exist`};
            };

            await this.campingServices.deleteCamping(id);
            return {message: `Camping ${id} deleted`};
        } catch (error) {
            return {message: error.message};
        };
    };


};