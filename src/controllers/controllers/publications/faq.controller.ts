import { Body, Controller, Get, Param, Post, Req, UseGuards, ValidationPipe, HttpStatus, Res } from "@nestjs/common";
import { Response } from 'express';
import { AuthentificationService } from "../../../authentification/authentification.service";
import { JwtAuthGuard } from "../../../authentification/jwt-auth.guard";
import { Faq } from "../../../domain/models/publication/faq.model";
import { FaqService } from "../../../services/publication/faq.service";
import { FaqDto } from "../../DTO/publications/faq.dto";
import { mapFaqDtoToModelCreate, mapFaqDtoToModelEdit } from "../../mappers/publications/faq.mapper";

@Controller()
export class FaqController {

    constructor(
        private readonly faqServices : FaqService,
        private readonly authServices : AuthentificationService
    ){};


    @Get('faqs')
    async getAllFaqs(@Res() res: Response): Promise<Faq[] | {}> {
        try {
            const faqs = await this.faqServices.getAllFaq();
            return res.status(HttpStatus.OK).send(faqs);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };


    @Get('faqs/:id')
    async getFaqByid(@Param('id') id: number, @Res() res: Response): Promise <Faq | {}> {
        try {
            const faq = await this.faqServices.getFaqById(id);
            return res.status(HttpStatus.OK).send(faq);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };    


    @UseGuards(JwtAuthGuard)
    @Post('faqs/create')
    async createFaq(
        @Req() req: Request,
        @Res() res: Response,
        @Body(new ValidationPipe()) createFaqDto : FaqDto): Promise <Faq | {}> {
            try {
                const userLogged = await this.authServices.getUserLogged(req);
                const faqToCreate = mapFaqDtoToModelCreate(createFaqDto, userLogged);
                const createdFaq = await this.faqServices.createFaq(faqToCreate);

                return res.status(HttpStatus.OK).json(createdFaq);
            } catch (error) {
                return res.status(HttpStatus.BAD_REQUEST).json({message : error.message}); 
            };
        };


    @UseGuards(JwtAuthGuard)
    @Post('faqs/:id/edit')
    async editFaq(
        @Req() req: Request,
        @Res() res: Response,
        @Param('id') id: number,
        @Body(new ValidationPipe()) editFaqDto : FaqDto): Promise <Faq | {}> {

            try {
                const faqToEdit = await this.faqServices.getFaqById(id);
                const userLogged = await this.authServices.getUserLogged(req);
                const mappedFaqToEdit = mapFaqDtoToModelEdit(faqToEdit, editFaqDto, userLogged);
                const editedFaq = await this.faqServices.editFaq(mappedFaqToEdit);

                return res.status(HttpStatus.OK).send(editedFaq);

            } catch (error) {
                return res.status(HttpStatus.BAD_REQUEST).json({message : error.message});
            };
        };


        @UseGuards(JwtAuthGuard)
        @Post('faqs/:id/delete')
        async deleteFaq(
            @Param('id') id: number, 
            @Req() req: Request,
            @Res() res: Response,): Promise <{}> {
            try {
                const userLogged = await this.authServices.getUserLogged(req);
                const faqId = +id;
                const faq = await this.faqServices.getFaqById(faqId);

                if(faq){
                    await this.faqServices.deleteFaq(userLogged, faqId);
                    return res.status(HttpStatus.OK).json({message: `faq ${faqId} deleted`});
                };

                return res.status(HttpStatus.BAD_REQUEST).json({message: `Faq ${faqId} do not exist`});

            } catch (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
            };
        };


};