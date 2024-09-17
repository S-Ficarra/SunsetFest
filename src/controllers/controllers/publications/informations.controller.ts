import { Body, Controller, Get, Param, Post, Req, UploadedFiles, UseGuards, UseInterceptors, ValidationPipe, HttpStatus, Res } from "@nestjs/common";
import { Response } from 'express';
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { multerConfig } from "../../../../multer.config";
import { AuthentificationService } from "../../../authentification/authentification.service";
import { JwtAuthGuard } from "../../../authentification/jwt-auth.guard";
import { Information } from "../../../domain/models/publication/information.model";
import { InformationService } from "../../../services/publication/information.service";
import { IllustratedDto } from "../../DTO/publications/illustrated.dto";
import { mapInformationDtoToModelCreate, mapInformationDtoToModelEdit } from "../../mappers/publications/information.mapper";



@Controller()
export class InformationController {

    constructor(
        private readonly infoServices : InformationService,
        private readonly authServices : AuthentificationService
    ){};


    @Get('informations')
    async getAllInformations(@Res() res: Response): Promise <Information[] | {}> {
        try {
            const allInformation = await this.infoServices.getAllInformation()
            return res.status(HttpStatus.OK).send(allInformation);
        } catch (error) {          
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };


    @Get('informations/:id')
    async getInformationsById(
        @Param('id') id: number, 
        @Res() res: Response): Promise <Information | {}> {
        try {
            const information = await this.infoServices.getInformationById(id)
            return res.status(HttpStatus.OK).send(information);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('informations/create')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 },],multerConfig))
    async createInformation(
        @UploadedFiles() files: { image?: Express.Multer.File[] },
        @Req()req: Request, 
        @Res() res: Response,
        @Body(new ValidationPipe()) createinformationDto: IllustratedDto): Promise <Information | {}> {

            try {
                const userLogged = await this.authServices.getUserLogged(req);
                const image = files.image ? files.image[0] : null;
                const imageUrl = `${image.destination}${image.filename} `

                const informationToCreate = mapInformationDtoToModelCreate(createinformationDto, imageUrl, userLogged);
                
                const createdInformation = await this.infoServices.createInformation(informationToCreate);

                return res.status(HttpStatus.OK).json(createdInformation);
            } catch (error) {
                return res.status(HttpStatus.BAD_REQUEST).json({message : error.message});  
            };
        };


    @UseGuards(JwtAuthGuard)
    @Post('informations/:id/edit')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 },],multerConfig))
    async editInformation(
        @Param('id') id: number,
        @UploadedFiles() files: { image?: Express.Multer.File[] },
        @Req()req: Request, 
        @Res() res: Response,
        @Body(new ValidationPipe()) editinformationDto: IllustratedDto): Promise <Information | {}> {

            try {
                const informationToEdit = await this.infoServices.getInformationById(id)
                const userLogged = await this.authServices.getUserLogged(req);
                const image = files.image ? files.image[0] : null;
                const imageUrl = `${image.destination}${image.filename} `

                const mappedInformationToEdit = mapInformationDtoToModelEdit(informationToEdit, editinformationDto, imageUrl, userLogged);
                const editedInformation = await this.infoServices.editInformation(mappedInformationToEdit);

                return res.status(HttpStatus.OK).send(editedInformation);
               
            } catch (error) {
                return res.status(HttpStatus.BAD_REQUEST).json({message : error.message});   
            };
        };


    @UseGuards(JwtAuthGuard)
    @Post('informations/:id/delete')
    async deleteInformation(
        @Param('id')id: number, 
        @Req()req: Request,
        @Res() res: Response ): Promise<{}> {
        try {
            const userLogged = await this.authServices.getUserLogged(req)
            const informationId = +id;
            const information = await this.infoServices.getInformationById(informationId);

            if(information){
                await this.infoServices.deleteInformation(userLogged, informationId);
                return res.status(HttpStatus.OK).json({message: `Information ${informationId} deleted`});
            };

            return res.status(HttpStatus.BAD_REQUEST).json({message: `Information ${informationId} do not exist`});

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});         
        };
    };


};