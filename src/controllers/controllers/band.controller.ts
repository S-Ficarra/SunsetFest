import { Body, Controller, Get, Param, Post, Req, UploadedFiles, UseGuards, UseInterceptors, ValidationPipe, HttpStatus, Res } from "@nestjs/common";
import { Response } from 'express';
import { JwtAuthGuard } from "../../authentification/jwt-auth.guard";
import { Band } from "../../domain/models/band/band.model";
import { BandService } from "../../services/band/band.service";
import { BandDto } from "../DTO/band.dto";
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerConfig } from "../../../multer.config";
import { AuthentificationService } from "../../authentification/authentification.service";
import { mapBandDtoToModelCreate, mapBandDtoToModelEdit } from "../mappers/band.mapper";
import * as fs from 'fs';
import * as path from 'path';


@Controller()
export class BandController {

    constructor(
        private readonly bandService: BandService,
        private readonly authService: AuthentificationService,
    ){};


    @Get('bands')
    async getAllBands(@Res() res: Response): Promise <Band[] | {}> {
        try {
            const allBands = await this.bandService.getAllBand();
            return res.status(HttpStatus.OK).send(allBands);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };

    
    @Get('bands/:id')
    async getBandById(
        @Param('id') id: number,
        @Res() res: Response): Promise<Band | {}> {      
        try {
            const band = await this.bandService.getBandById(id);
            return res.status(HttpStatus.OK).send(band);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('bands/create')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'thumbnailImage', maxCount: 1 },
        { name: 'bannerImage', maxCount: 1 },], 
        multerConfig))
    async createBand( 
        @UploadedFiles() files: { thumbnailImage?: Express.Multer.File[], bannerImage?: Express.Multer.File[] },
        @Req()req: Request, 
        @Res() res: Response,
        @Body(new ValidationPipe()) createBandDto: BandDto): Promise <Band | {} > {

        try {

            const userLogged = await this.authService.getUserLogged(req)
            const thumbnailImage = files.thumbnailImage ? files.thumbnailImage[0] : null;
            const bannerImage = files.bannerImage ? files.bannerImage[0] : null;
            const thumbnailUrl = `${thumbnailImage.destination}${thumbnailImage.filename} `
            const bannerUrl = `${bannerImage.destination}${bannerImage.filename} `
            const bandToCreate = mapBandDtoToModelCreate(createBandDto, thumbnailUrl, bannerUrl, userLogged);

            const createdBand = await this.bandService.createBand(bandToCreate);

            return res.status(HttpStatus.OK).json(createdBand);
            
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({message : error.message});  
        };    
    };


    @UseGuards(JwtAuthGuard)
    @Post('bands/:id/edit')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'thumbnailImage', maxCount: 1 },
        { name: 'bannerImage', maxCount: 1 },], 
        multerConfig))
    async editBand(
        @Param('id')id: number,
        @UploadedFiles() files: { thumbnailImage?: Express.Multer.File[], bannerImage?: Express.Multer.File[] },
        @Req()req: Request, 
        @Res() res: Response,
        @Body(new ValidationPipe()) editBandDto: BandDto): Promise <Band | {} > {

            try {
                
                const userLogged = await this.authService.getUserLogged(req)
                const bandToEdit = await this.bandService.getBandById(id);

                const thumbnailImage = files.thumbnailImage ? files.thumbnailImage[0] : null;
                const bannerImage = files.bannerImage ? files.bannerImage[0] : null;

                const oldThumbnailUrl = bandToEdit.getThumbnailImageUrl();
                const oldBannerUrl = bandToEdit.getBannerImageUrl();

                const newThumbnailUrl = thumbnailImage ? `${thumbnailImage.destination}${thumbnailImage.filename}` : oldThumbnailUrl;
                const newBannerUrl = bannerImage ? `${bannerImage.destination}${bannerImage.filename}` : oldBannerUrl;

                if (oldThumbnailUrl !== newThumbnailUrl) {
                    await fs.promises.unlink(oldThumbnailUrl);
                }

                if (oldBannerUrl !== newBannerUrl) {
                    await fs.promises.unlink(oldBannerUrl);
                }

                const mappedBandToEdit = mapBandDtoToModelEdit(bandToEdit, editBandDto, newThumbnailUrl, newBannerUrl, userLogged)
               
                const editedBand = await this.bandService.editBand(mappedBandToEdit)
                return res.status(HttpStatus.OK).send(editedBand);

            } catch (error) {
                return res.status(HttpStatus.BAD_REQUEST).json({message : error.message});   
            };
    };


    @UseGuards(JwtAuthGuard)
    @Post('bands/:id/delete')
    async deleteBand(
        @Param('id')id: number, 
        @Req()req: Request,
        @Res() res: Response ): Promise<{}> {

        try {
            const userLogged = await this.authService.getUserLogged(req)
            const bandId = +id;
            const band = await this.bandService.getBandById(id);

            if (band) {
                const thumbnailImagePath = band.getThumbnailImageUrl();
                const bannerImagePath = band.getBannerImageUrl(); 

                await fs.promises.unlink(thumbnailImagePath);
                await fs.promises.unlink(bannerImagePath);

                await this.bandService.deleteBand(userLogged, id);
                return res.status(HttpStatus.OK).json({message: `Band ${bandId} deleted`});
            };

            return res.status(HttpStatus.BAD_REQUEST).json({message: `Band ${bandId} do not exist`});

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});         
        }; 
    };


};

