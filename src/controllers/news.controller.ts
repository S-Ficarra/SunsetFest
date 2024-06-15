import { Body, Controller, Get, Param, Post, Req, UploadedFiles, UseGuards, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { multerConfig } from "multer.config";
import { JwtAuthGuard } from "src/authentification/jwt-auth.guard";
import { News } from "src/domain/models/publication/news.model";
import { NewsService } from "src/services/publication/news.service";
import { NewsDto } from "./DTO/news.dto";
import { mapNewsDtoToModelCreate, mapNewsDtoToModelEdit } from "./mappers/news.mapper";
import { AuthentificationService } from "src/authentification/authentification.service";

@Controller()
export class NewsController {

    constructor(
        private readonly newsService : NewsService,
        private readonly authService : AuthentificationService

    ){};

    @UseGuards(JwtAuthGuard)
    @Get('news')
    async getAllNews(): Promise <News[] | {}> {
        try {
            return await this.newsService.getAllNews();
        } catch (error) {
            return {message : error.message}; 
        };
    };


    @UseGuards(JwtAuthGuard)
    @Get('news/:id')
    async getNewsById(@Param('id') id: number): Promise <News | {}> {
        try {
            return await this.newsService.getNewsById(id);
        } catch (error) {
            return {message : error.message}; 
        }
    };
    

    @UseGuards(JwtAuthGuard)
    @Post('news/createnews')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 },],multerConfig))
    async createNews(
        @UploadedFiles() files: { image?: Express.Multer.File[] },
        @Req()req: Request, 
        @Body(new ValidationPipe()) createNewsDto: NewsDto): Promise <News | {}> {
            
            try {
            
                const userLogged = await this.authService.getUserLogged(req)
                const image = files.image ? files.image[0].buffer : null;
                const newsToCreate = mapNewsDtoToModelCreate(createNewsDto, image, userLogged);

                return await this.newsService.createNews(newsToCreate);
                
            } catch (error) {
                return {message : error.message};   
                
            }
    };


    @UseGuards(JwtAuthGuard)
    @Post('news/:id/editnews')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 },],multerConfig))
    async editNews (
        @Param('id')id: number,
        @UploadedFiles() files: { image?: Express.Multer.File[] },
        @Req()req: Request, 
        @Body(new ValidationPipe()) editNewsDto: NewsDto): Promise <News | {}> {
            
            try {
                const userLogged = await this.authService.getUserLogged(req);
                const newstoEdit = await this.newsService.getNewsById(id);
                const image = files.image ? files.image[0].buffer : null;
                const mappedNewsToEdit = mapNewsDtoToModelEdit(newstoEdit, editNewsDto, image, userLogged);

                return await this.newsService.editNews(mappedNewsToEdit);

            } catch (error) {
                return {message : error.message}; 
            };
    };
    

    @UseGuards(JwtAuthGuard)
    @Post('news/:id/deletenews')
    async deleteBand(@Param('id')id: number, @Req()req: Request ): Promise<{}> {
    
        try {
            const userLogged = await this.authService.getUserLogged(req)
            const newsId = +id;
            const news = await this.newsService.getNewsById(newsId);
            if(!news){
                return {message: `News ${newsId} do not exist`};
            };
            await this.newsService.deleteNews(userLogged, newsId);
            return {message: `News ${newsId} deleted`};
        } catch (error) {
            return {message : error.message };             
        };
    };


};