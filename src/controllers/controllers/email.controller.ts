import { Body, Controller, Post, ValidationPipe, HttpStatus, Res } from "@nestjs/common";
import { Response } from 'express';
import { ContactEmailDto } from "../DTO/contact.email.dto";
import { EmailService } from "src/services/email.service";


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
            return res.status(HttpStatus.OK).send('Email sent Successfully');
            
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };

    };

}



