import { Body, Controller, Get, Param, Post, Req, UploadedFiles, UseGuards, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { multerConfig } from "multer.config";
import { AuthentificationService } from "src/authentification/authentification.service";
import { JwtAuthGuard } from "src/authentification/jwt-auth.guard";
import { Information } from "src/domain/models/publication/information.model";
import { InformationService } from "src/services/publication/information.service";
import { IllustratedDto } from "../../DTO/publications/illustrated.dto";
import { mapInformationDtoToModelCreate, mapInformationDtoToModelEdit } from "../../mappers/publications/information.mapper";



@Controller()
export class InformationController {

    constructor(
        private readonly infoServices : InformationService,
        private readonly authServices : AuthentificationService
    ){};


    @UseGuards(JwtAuthGuard)
    @Get('informations')
    async getAllInformations(): Promise <Information[] | {}> {
        try {
            return await this.infoServices.getAllInformation()
        } catch (error) {
            return {message: error.message}
        }
    };


    @UseGuards(JwtAuthGuard)
    @Get('informations/:id')
    async getInformationsById(@Param('id') id: number): Promise <Information | {}> {
        try {
            return await this.infoServices.getInformationById(id)
        } catch (error) {
            return {message: error.message}
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('informations/create')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 },],multerConfig))
    async createInformation(
        @UploadedFiles() files: { image?: Express.Multer.File[] },
        @Req()req: Request, 
        @Body(new ValidationPipe()) createinformationDto: IllustratedDto): Promise <Information | {}> {

            try {
                const userLogged = await this.authServices.getUserLogged(req);
                const image = files.image ? files.image[0].buffer : null;
                const informationToCreate = mapInformationDtoToModelCreate(createinformationDto, image, userLogged);

                return await this.infoServices.createInformation(informationToCreate);
               
            } catch (error) {
                return {message : error.message};   
            };
        };


    @UseGuards(JwtAuthGuard)
    @Post('informations/:id/edit')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 },],multerConfig))
    async editInformation(
        @Param('id') id: number,
        @UploadedFiles() files: { image?: Express.Multer.File[] },
        @Req()req: Request, 
        @Body(new ValidationPipe()) editinformationDto: IllustratedDto): Promise <Information | {}> {

            try {
                const informationToEdit = await this.infoServices.getInformationById(id)
                const userLogged = await this.authServices.getUserLogged(req);
                const image = files.image ? files.image[0].buffer : null;
                const mappedInformationToEdit = mapInformationDtoToModelEdit(informationToEdit, editinformationDto, image, userLogged);

                return await this.infoServices.editInformation(mappedInformationToEdit);
               
            } catch (error) {
                return {message : error.message};   
            };
        };


    @UseGuards(JwtAuthGuard)
    @Post('informations/:id/delete')
    async deleteInformation(@Param('id')id: number, @Req()req: Request ): Promise<{}> {
        try {
            const userLogged = await this.authServices.getUserLogged(req)
            const informationId = +id;
            const information = await this.infoServices.getInformationById(informationId);

            if(information){
                await this.infoServices.deleteInformation(userLogged, informationId);
                return {message: `Information ${informationId} deleted`};
            };

            return {message: `Information ${informationId} do not exist`};

        } catch (error) {
            return {message : error.message };             
        };
    };


};