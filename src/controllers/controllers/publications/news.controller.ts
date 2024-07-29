import { Body, Controller, Get, Param, Post, Req, UploadedFiles, UseGuards, UseInterceptors, ValidationPipe, HttpStatus, Res } from "@nestjs/common";
import { Response } from 'express';
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { multerConfig } from "../../../../multer.config";
import { JwtAuthGuard } from "../../../authentification/jwt-auth.guard";
import { News } from "../../../domain/models/publication/news.model";
import { NewsService } from "../../../services/publication/news.service";
import { IllustratedDto } from "../../DTO/publications/illustrated.dto";
import { mapNewsDtoToModelCreate, mapNewsDtoToModelEdit } from "../../mappers/publications/news.mapper";
import { AuthentificationService } from "../../../authentification/authentification.service";

@Controller()
export class NewsController {

    constructor(
        private readonly newsServices : NewsService,
        private readonly authServices : AuthentificationService

    ){};

    @Get('news')
    async getAllNews(
        @Res() res: Response): Promise <News[] | {}> {
        try {
            const allNews = await this.newsServices.getAllNews();
            return res.status(HttpStatus.OK).send(allNews);

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };


    @Get('news/:id')
    async getNewsById(
        @Param('id') id: number,
        @Res() res: Response): Promise <News | {}> {
        try {
            const news = await this.newsServices.getNewsById(id);
            return res.status(HttpStatus.OK).send(news);

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        }
    };
    

    @UseGuards(JwtAuthGuard)
    @Post('news/create')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 },],multerConfig))
    async createNews(
        @UploadedFiles() files: { image?: Express.Multer.File[] },
        @Req()req: Request, 
        @Res() res: Response,
        @Body(new ValidationPipe()) createNewsDto: IllustratedDto): Promise <News | {}> {
            
            try {         
                const userLogged = await this.authServices.getUserLogged(req)
                const image = files.image ? files.image[0].buffer : null;
                const newsToCreate = mapNewsDtoToModelCreate(createNewsDto, image, userLogged);

                const createdNews = await this.newsServices.createNews(newsToCreate);

                return res.status(HttpStatus.OK).json(createdNews);                
            } catch (error) {
                return res.status(HttpStatus.BAD_REQUEST).json({message : error.message});  
            };
        };


    @UseGuards(JwtAuthGuard)
    @Post('news/:id/edit')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 },],multerConfig))
    async editNews (
        @Param('id')id: number,
        @UploadedFiles() files: { image?: Express.Multer.File[] },
        @Req()req: Request, 
        @Res() res: Response,
        @Body(new ValidationPipe()) editNewsDto: IllustratedDto): Promise <News | {}> {
            
            try {
                const userLogged = await this.authServices.getUserLogged(req);
                const newstoEdit = await this.newsServices.getNewsById(id);
                const image = files.image ? files.image[0].buffer : null;
                const mappedNewsToEdit = mapNewsDtoToModelEdit(newstoEdit, editNewsDto, image, userLogged);
                const editedNews = await this.newsServices.editNews(mappedNewsToEdit);

                return res.status(HttpStatus.OK).send(editedNews);
            } catch (error) {
                return res.status(HttpStatus.BAD_REQUEST).json({message : error.message});   
            };
    };
    

    @UseGuards(JwtAuthGuard)
    @Post('news/:id/delete')
    async deleteNews(
        @Param('id')id: number,
        @Req()req: Request,
        @Res() res: Response ): Promise<{}> {
    
        try {
            const userLogged = await this.authServices.getUserLogged(req)
            const newsId = +id;
            const news = await this.newsServices.getNewsById(newsId);

            if(news){
                await this.newsServices.deleteNews(userLogged, newsId);
                return res.status(HttpStatus.OK).json({message: `News ${newsId} deleted`});
            };

            return res.status(HttpStatus.BAD_REQUEST).json({message: `News ${newsId} do not exist`});
            
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});         
        };
    };


};