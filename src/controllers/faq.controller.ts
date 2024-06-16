import { Body, Controller, Get, Param, Post, Req, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthentificationService } from "src/authentification/authentification.service";
import { JwtAuthGuard } from "src/authentification/jwt-auth.guard";
import { Faq } from "src/domain/models/publication/faq.model";
import { FaqService } from "src/services/publication/faq.service";
import { FaqDto } from "./DTO/faq.dto";
import { mapFaqDtoToModelCreate, mapFaqDtoToModelEdit } from "./mappers/faq.mapper";

@Controller()
export class FaqController {

    constructor(
        private readonly faqServices : FaqService,
        private readonly authServices : AuthentificationService
    ){};


    @UseGuards(JwtAuthGuard)
    @Get('faqs')
    async getAllFaqs(): Promise<Faq[] | {}> {
        try {
            return await this.faqServices.getAllFaq();
        } catch (error) {
            return {message: error.message};
        };
    };


    @UseGuards(JwtAuthGuard)
    @Get('faqs/:id')
    async getFaqByid(@Param('id') id: number): Promise <Faq | {}> {
        try {
            return await this.faqServices.getFaqById(id);
        } catch (error) {
            return {message: error.message};
        };
    };    


    @UseGuards(JwtAuthGuard)
    @Post('faqs/createfaq')
    async createFaq(
        @Req() req: Request,
        @Body(new ValidationPipe()) createFaqDto : FaqDto): Promise <Faq | {}> {
            try {
                const userLogged = await this.authServices.getUserLogged(req);
                const faqToCreate = mapFaqDtoToModelCreate(createFaqDto, userLogged);
                return await this.faqServices.createFaq(faqToCreate);
            } catch (error) {
                return {message : error.message};   
            };
        };


    @UseGuards(JwtAuthGuard)
    @Post('faqs/:id/editfaq')
    async editFaq(
        @Req() req: Request,
        @Param('id') id: number,
        @Body(new ValidationPipe()) editFaqDto : FaqDto): Promise <Faq | {}> {

            try {
                const faqToEdit = await this.faqServices.getFaqById(id);
                const userLogged = await this.authServices.getUserLogged(req);
                const mappedFaqToEdit = mapFaqDtoToModelEdit(faqToEdit, editFaqDto, userLogged);

                return await this.faqServices.editFaq(mappedFaqToEdit);
            } catch (error) {
                return {message : error.message};   
            };
        };


        @UseGuards(JwtAuthGuard)
        @Post('faqs/:id/deletefaq')
        async deleteFaq(@Param('id') id: number, @Req() req: Request): Promise <{}> {
            try {
                const userLogged = await this.authServices.getUserLogged(req);
                const faqId = +id;
                const faq = await this.faqServices.getFaqById(faqId);
                if(!faq){
                    return {message: `Faq ${faqId} do not exist`};
                };
                await this.faqServices.deleteFaq(userLogged, faqId);
                return {message: `faq ${faqId} deleted`};
            } catch (error) {
                return {message: error.message};
            };
        };


};