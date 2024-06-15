import { Body, Controller, Get, Param, Post, Req, UploadedFiles, UseGuards, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "src/authentification/jwt-auth.guard";
import { Band } from "src/domain/models/band/band.model";
import { BandService } from "src/services/band/band.service";
import { BandDto } from "./DTO/band.dto";
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerConfig } from "multer.config";
import { AuthentificationService } from "src/authentification/authentification.service";
import { mapBandDtoToModelCreate, mapBandDtoToModelEdit } from "./mappers/band.mapper";



@Controller()
export class BandController {

    constructor(
        private readonly bandService: BandService,
        private readonly authService: AuthentificationService,
    ){};


    @UseGuards(JwtAuthGuard)
    @Get('bands')
    async getAllBands(): Promise <Band[] | {}> {
        try {
            return this.bandService.getAllBand();
        } catch (error) {
            return {message : error.message}; 
        };
    };

    
    @UseGuards(JwtAuthGuard)
    @Get('bands/:id')
    async getBandById(@Param('id') id: number): Promise<Band | {}> {      
        try {
            return await this.bandService.getBandById(id);
        } catch (error) {
            return {message : error.message}; 
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('bands/createband')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'thumbnailImage', maxCount: 1 },
        { name: 'bannerImage', maxCount: 1 },], 
        multerConfig))
    async createBand( 
        @UploadedFiles() files: { thumbnailImage?: Express.Multer.File[], bannerImage?: Express.Multer.File[] },
        @Req()req: Request, 
        @Body(new ValidationPipe()) createBandDto: BandDto): Promise <Band | {} > {

        try {

            const userLogged = await this.authService.getUserLogged(req)
            const thumbnailImage = files.thumbnailImage ? files.thumbnailImage[0].buffer : null;
            const bannerImage = files.bannerImage ? files.bannerImage[0].buffer : null;
            const bandToCreate = mapBandDtoToModelCreate(createBandDto, thumbnailImage, bannerImage, userLogged);

            return await this.bandService.createBand(bandToCreate);
            
        } catch (error) {
            return {message : error.message};   
        };    
    };


    @UseGuards(JwtAuthGuard)
    @Post('bands/:id/editband')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'thumbnailImage', maxCount: 1 },
        { name: 'bannerImage', maxCount: 1 },], 
        multerConfig))
    async editBand(
        @Param('id')id: number,
        @UploadedFiles() files: { thumbnailImage?: Express.Multer.File[], bannerImage?: Express.Multer.File[] },
        @Req()req: Request, 
        @Body(new ValidationPipe()) editBandDto: BandDto): Promise <Band | {} > {

            try {
                const userLogged = await this.authService.getUserLogged(req)
                const bandToEdit = await this.bandService.getBandById(id);
                const thumbnailImage = files.thumbnailImage ? files.thumbnailImage[0].buffer : null;
                const bannerImage = files.bannerImage ? files.bannerImage[0].buffer : null;
                const mappedBandToEdit = mapBandDtoToModelEdit(bandToEdit, editBandDto, thumbnailImage, bannerImage, userLogged)

                return await this.bandService.editBand(mappedBandToEdit)
                
            } catch (error) {
                return {message : error.message}; 
            };
    };


    @UseGuards(JwtAuthGuard)
    @Post('bands/:id/deleteband')
    async deleteBand(@Param('id')id: number, @Req()req: Request ): Promise<{}> {

        try {
            const userLogged = await this.authService.getUserLogged(req)
            const bandId = +id;
            const band = await this.bandService.getBandById(id);
            if (!band) {
                return {message: `Band ${bandId} do not exist`};
            }
            await this.bandService.deleteBand(userLogged, id);
            return {message: `Band ${bandId} deleted`};
        } catch (error) {
            return {message : error.message }; 
        }; 
    };


};

