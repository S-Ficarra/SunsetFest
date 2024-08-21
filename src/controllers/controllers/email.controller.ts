import { Body, Controller, Post, ValidationPipe, HttpStatus, Res, UseInterceptors, UploadedFile } from "@nestjs/common";
import { Response } from 'express';
import { ContactEmailDto } from "../DTO/contact.email.dto";
import { EmailService } from "src/services/email.service";
import { PressEmailDto } from "../DTO/press.email.dto";
import { FileInterceptor } from "@nestjs/platform-express";


@Controller()
export class EmailController {


    constructor( 
        private readonly emailService: EmailService
    ){};

    @Post('sendemail/contact')
    async sendContactEmail(
        @Res() res: Response,
        @Body(new ValidationPipe()) contactEmailDto: ContactEmailDto): Promise <{}> {

            try {            
                await this.emailService.sendContactEmail(contactEmailDto)
                return res.status(HttpStatus.OK).json({message: 'Email sent Successfully'});
                
            } catch (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
            };

    };

    @Post('sendemail/press')
    @UseInterceptors(FileInterceptor('pdf', { limits: { fileSize: 5 * 1024 * 1024 } }))
    async sendPressEmail(
        @Res() res: Response,
        @Body(new ValidationPipe()) pressEmailDto: PressEmailDto,
        @UploadedFile() pdf: Express.Multer.File): Promise<{}> {

            try {            
                await this.emailService.sendPressEmail(pressEmailDto, pdf)
                return res.status(HttpStatus.OK).json({message: 'Email sent Successfully'});
                
            } catch (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
            };

    };

}



