import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe } from "@nestjs/common";
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


    @UseGuards(JwtAuthGuard)
    @Get('countdowns')
    async getAllCountdowns(): Promise <Countdown[] | {}> {
        try {
            return await this.countdownService.getAllCountdowns();
        } catch (error) {
            return {message: error.message};
        };
    };


    @UseGuards(JwtAuthGuard)
    @Get('countdowns/:id')
    async getCountdownById(@Param('id') id: number): Promise <Countdown | {}> {
        try {
            return await this.countdownService.getCountdownById(id);
        } catch (error) {
            return {message: error.message};
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('countdowns/create')
    async createCountdown(@Body(new ValidationPipe()) createCountdownDto: CountdownDto): Promise <Countdown | {}> {
        try {
            const countdownToCreate = mapCountdownDtoToModelCreate(createCountdownDto);
            const countdownCreated = await this.countdownService.createCountdown(countdownToCreate);
            return countdownCreated;
            
        } catch (error) {
            return {message: error.message};
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('countdowns/:id/edit')
    async editCountdown(
        @Param('id') id: number,
        @Body(new ValidationPipe()) editCountdownDto : CountdownDto): Promise <Countdown | {}> {
            try {
                const countdownToEdit = await this.countdownService.getCountdownById(id);
                const mappedCountdownToEdit = mapCountdownDtoToModelEdit(countdownToEdit, editCountdownDto);
                const countdownEdited = await this.countdownService.editCountdown(mappedCountdownToEdit);
                return countdownEdited;

            } catch (error) {
                return {message: error.message};
            };
        };



    @UseGuards(JwtAuthGuard)
    @Post('countdowns/:id/delete')
    async deleteCountdown(@Param('id') id: number): Promise <{}> {
        try {
            const countdownToDelete = await this.countdownService.getCountdownById(id);

            if (countdownToDelete) {
                await this.countdownService.deleteCountdown(id);
                return {message: `Countdown ${id} deleted`};
            };

            return {message: `Countdown ${id} do not exist`};

        } catch (error) {
            return {message: error.message};
        };
    };


};

