import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "src/authentification/jwt-auth.guard";
import { Countdown } from "src/domain/models/countdown.model";
import { CountdownService } from "src/services/countdown.service";
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
    @Post('countdowns/createcountdown')
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
    @Post('countdowns/:id/editcountdown')
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
    @Post('countdowns/:id/deletecountdown')
    async deleteCountdown(@Param('id') id: number): Promise <{}> {

        try {
            const countdownToDelete = await this.countdownService.getCountdownById(id);

            if (!countdownToDelete) {
                return {message: `Countdown ${id} do not exist`};
            };

            await this.countdownService.deleteCountdown(id);
            return {message: `Countdown ${id} deleted`};
        } catch (error) {
            return {message: error.message};
        };
    };


};

