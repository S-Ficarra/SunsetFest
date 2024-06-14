import { Body, Controller, Get, Param, Post, Req, UploadedFiles, UseGuards, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "src/authentification/jwt-auth.guard";
import { Band } from "src/domain/models/band/band.model";
import { BandService } from "src/services/band/band.service";
import { UserService } from "src/services/user/user.service";
import * as jwt from 'jsonwebtoken';
import { CreateBandDto } from "src/database/mappers/program/bands.mapper";
import { Socials } from "src/domain/models/band/socials.model";
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerConfig } from "multer.config";





@Controller()
export class BandController {


    constructor(
        private readonly bandService: BandService,
        private readonly userService: UserService,
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
        @Body(new ValidationPipe()) createBandDto: CreateBandDto): Promise <Band | {} > {

            const authHeader = req.headers['authorization'];
            const token = authHeader.substring(7); 
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const userLoggedIn = await this.userService.getUserById(+decodedToken.sub)

            try {

                const socials = new Socials (
                    createBandDto.facebook,
                    createBandDto.instagram,
                    createBandDto.twitter,
                    createBandDto.youtube,
                    createBandDto.spotify,
                    createBandDto.website,
                    createBandDto.spotifyIntegration,
                    createBandDto.youtubeIntegration
                );

                const thumbnailImage = files.thumbnailImage ? files.thumbnailImage[0].buffer : null;
                const bannerImage = files.bannerImage ? files.bannerImage[0].buffer : null;

                const bandToCreate = new Band (
                    createBandDto.name,
                    createBandDto.country,
                    createBandDto.text,
                    socials,
                    thumbnailImage,
                    bannerImage,
                    userLoggedIn,
                    new Date(),
                    new Date()
                );

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
        @Body(new ValidationPipe()) createBandDto: CreateBandDto): Promise <Band | {} > {

            const authHeader = req.headers['authorization'];
            const token = authHeader.substring(7); 
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const userLoggedIn = await this.userService.getUserById(+decodedToken.sub)

            const bandToEdit = await this.bandService.getBandById(id);
            const thumbnailImage = files.thumbnailImage ? files.thumbnailImage[0].buffer : null;
            const bannerImage = files.bannerImage ? files.bannerImage[0].buffer : null;

            try {
                const socials = new Socials (
                    createBandDto.facebook,
                    createBandDto.instagram,
                    createBandDto.twitter,
                    createBandDto.youtube,
                    createBandDto.spotify,
                    createBandDto.website,
                    createBandDto.spotifyIntegration,
                    createBandDto.youtubeIntegration
                );                

                bandToEdit.setName(createBandDto.name);
                bandToEdit.setCountry(createBandDto.country);
                bandToEdit.setText(createBandDto.text)
                bandToEdit.setSocials(socials),                    
                bandToEdit.setThumbnailImage(thumbnailImage);
                bandToEdit.setBannerImage(bannerImage)
                bandToEdit.setAuthor(userLoggedIn);
                bandToEdit.setCreatedAt(bandToEdit.getCreatedAt());
                bandToEdit.setModifiedAt(new Date())              

                return await this.bandService.editBand(bandToEdit)
                
            } catch (error) {
                return {message : error.message}; 
            };
    };


    @UseGuards(JwtAuthGuard)
    @Post('bands/:id/deleteband')
    async deleteBand(@Param('id')id: number, @Req()req: Request ): Promise<{}> {
    
        const authHeader = req.headers['authorization'];
        const token = authHeader.substring(7); 
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userLoggedIn = await this.userService.getUserById(+decodedToken.sub)

        try {
            const bandId = +id;
            const band = await this.bandService.getBandById(id);
            if (!band) {
                return {message: `Band ${bandId} do not exist`};
            }
            await this.bandService.deleteBand(userLoggedIn, id);
            return {message: `Band ${bandId} deleted`};
        } catch (error) {
            return {message : error.message }; 
        }; 
    };

};

