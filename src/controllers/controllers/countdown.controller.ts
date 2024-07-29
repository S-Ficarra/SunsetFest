import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe, HttpStatus, Res } from "@nestjs/common";
import { Response } from 'express';
import { JwtAuthGuard } from "../../authentification/jwt-auth.guard";
import { Countdown } from "../../domain/models/countdown.model";
import { CountdownService } from "../../services/countdown.service";
import { CountdownDto } from "../DTO/countdown.dto";
import { mapCountdownDtoToModelCreate, mapCountdownDtoToModelEdit } from "../mappers/countdown.mapper";



@Controller()
export class CountdownController {


    constructor( 
        private readonly countdownService: CountdownService
    ){};


    @Get('countdowns')
    async getAllCountdowns(@Res() res: Response): Promise <Countdown[] | {}> {
        try {
            const allCountdowns = await this.countdownService.getAllCountdowns();
            return res.status(HttpStatus.OK).send(allCountdowns);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };


    @Get('countdowns/:id')
    async getCountdownById(
        @Res() res: Response,
        @Param('id') id: number): Promise <Countdown | {}> {
        try {
            const countdown = await this.countdownService.getCountdownById(id);
            return res.status(HttpStatus.OK).send(countdown);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('countdowns/create')
    async createCountdown(
        @Res() res: Response,
        @Body(new ValidationPipe()) createCountdownDto: CountdownDto): Promise <Countdown | {}> {
        try {
            const countdownToCreate = mapCountdownDtoToModelCreate(createCountdownDto);
            const countdownCreated = await this.countdownService.createCountdown(countdownToCreate);
            return res.status(HttpStatus.OK).send(countdownCreated);
            
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('countdowns/:id/edit')
    async editCountdown(
        @Res() res: Response,
        @Param('id') id: number,
        @Body(new ValidationPipe()) editCountdownDto : CountdownDto): Promise <Countdown | {}> {
            try {
                const countdownToEdit = await this.countdownService.getCountdownById(id);
                const mappedCountdownToEdit = mapCountdownDtoToModelEdit(countdownToEdit, editCountdownDto);
                const countdownEdited = await this.countdownService.editCountdown(mappedCountdownToEdit);
                return res.status(HttpStatus.OK).send(countdownEdited);

            } catch (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
            };
        };



    @UseGuards(JwtAuthGuard)
    @Post('countdowns/:id/delete')
    async deleteCountdown(
        @Res() res: Response,
        @Param('id') id: number): Promise <{}> {
        try {
            const countdownToDelete = await this.countdownService.getCountdownById(id);

            if (countdownToDelete) {
                await this.countdownService.deleteCountdown(id);
                return res.status(HttpStatus.OK).json({message: `Countdown ${id} deleted`});
            };

            return res.status(HttpStatus.BAD_REQUEST).json({message: `Countdown ${id} do not exist`});

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };


};

