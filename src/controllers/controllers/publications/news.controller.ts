import { Body, Controller, Get, Param, Post, Req, UploadedFiles, UseGuards, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { multerConfig } from "multer.config";
import { JwtAuthGuard } from "src/authentification/jwt-auth.guard";
import { News } from "src/domain/models/publication/news.model";
import { NewsService } from "src/services/publication/news.service";
import { IllustratedDto } from "../../DTO/publications/illustrated.dto";
import { mapNewsDtoToModelCreate, mapNewsDtoToModelEdit } from "../../mappers/publications/news.mapper";
import { AuthentificationService } from "src/authentification/authentification.service";

@Controller()
export class NewsController {

    constructor(
        private readonly newsServices : NewsService,
        private readonly authServices : AuthentificationService

    ){};

    @UseGuards(JwtAuthGuard)
    @Get('news')
    async getAllNews(): Promise <News[] | {}> {
        try {
            return await this.newsServices.getAllNews();
        } catch (error) {
            return {message : error.message}; 
        };
    };


    @UseGuards(JwtAuthGuard)
    @Get('news/:id')
    async getNewsById(@Param('id') id: number): Promise <News | {}> {
        try {
            return await this.newsServices.getNewsById(id);
        } catch (error) {
            return {message : error.message}; 
        }
    };
    

    @UseGuards(JwtAuthGuard)
    @Post('news/create')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 },],multerConfig))
    async createNews(
        @UploadedFiles() files: { image?: Express.Multer.File[] },
        @Req()req: Request, 
        @Body(new ValidationPipe()) createNewsDto: IllustratedDto): Promise <News | {}> {
            
            try {         
                const userLogged = await this.authServices.getUserLogged(req)
                const image = files.image ? files.image[0].buffer : null;
                const newsToCreate = mapNewsDtoToModelCreate(createNewsDto, image, userLogged);

                return await this.newsServices.createNews(newsToCreate);
                
            } catch (error) {
                return {message : error.message};   
                
            }
    };


    @UseGuards(JwtAuthGuard)
    @Post('news/:id/edit')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 },],multerConfig))
    async editNews (
        @Param('id')id: number,
        @UploadedFiles() files: { image?: Express.Multer.File[] },
        @Req()req: Request, 
        @Body(new ValidationPipe()) editNewsDto: IllustratedDto): Promise <News | {}> {
            
            try {
                const userLogged = await this.authServices.getUserLogged(req);
                const newstoEdit = await this.newsServices.getNewsById(id);
                const image = files.image ? files.image[0].buffer : null;
                const mappedNewsToEdit = mapNewsDtoToModelEdit(newstoEdit, editNewsDto, image, userLogged);

                return await this.newsServices.editNews(mappedNewsToEdit);

            } catch (error) {
                return {message : error.message}; 
            };
    };
    

    @UseGuards(JwtAuthGuard)
    @Post('news/:id/delete')
    async deleteNews(@Param('id')id: number, @Req()req: Request ): Promise<{}> {
    
        try {
            const userLogged = await this.authServices.getUserLogged(req)
            const newsId = +id;
            const news = await this.newsServices.getNewsById(newsId);

            if(news){
                await this.newsServices.deleteNews(userLogged, newsId);
                return {message: `News ${newsId} deleted`};
            };

            return {message: `News ${newsId} do not exist`};
            
        } catch (error) {
            return {message : error.message };             
        };
    };


};