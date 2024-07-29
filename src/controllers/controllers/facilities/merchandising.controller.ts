import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe, HttpStatus, Res } from "@nestjs/common";
import { Response } from 'express';
import { JwtAuthGuard } from "../../../authentification/jwt-auth.guard";
import { Merchandising } from "../../../domain/models/facility/shop/merchandising.model";
import { MerchandisingService } from "../../../services/facility/shop/merchandising.service";
import { MerchandisingDto } from "../../DTO/facilities/merchandising.dto";
import { mapMerchandisingDtoToModel, mapMerchandisingDtoToModelEdit } from "../../mappers/facilities/merchandising.mapper";



@Controller()
export class MerchandisingController {


    constructor (private readonly merchServices : MerchandisingService){};


    @UseGuards(JwtAuthGuard)
    @Get('merchandisings')
    async getAllMerchandising(@Res() res: Response): Promise <Merchandising[] | {}> {
        try {
            const allMerchs = await this.merchServices.getAllMerchandising();
            return res.status(HttpStatus.OK).send(allMerchs);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };


    @UseGuards(JwtAuthGuard)
    @Get('merchandisings/:id')
    async getMerchandisingById(
        @Res() res: Response,
        @Param('id') id: number):Promise <Merchandising | {}> {
        try {
            const merch = await this.merchServices.getMerchandisingById(id);
            return res.status(HttpStatus.OK).send(merch);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('merchandisings/create')
    async createMerchandising (
        @Res() res: Response,
        @Body(new ValidationPipe()) createMerchDto: MerchandisingDto): Promise <Merchandising | {}> {
        try {
            const merchToCreate = mapMerchandisingDtoToModel(createMerchDto);
            const merchCreated = await this.merchServices.createMerchandising(merchToCreate);
            return res.status(HttpStatus.OK).send(merchCreated);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };



    @UseGuards(JwtAuthGuard)
    @Post('merchandisings/:id/edit')
    async editMerchandising(
        @Res() res: Response,
        @Param('id') id: number,
        @Body(new ValidationPipe()) editMerchDto: MerchandisingDto): Promise <Merchandising | {}> {

            try {
                const merchToEdit = await this.merchServices.getMerchandisingById(id);                                
                const mappedMerchToEdit = mapMerchandisingDtoToModelEdit(merchToEdit, editMerchDto);
                const editedMerch = await this.merchServices.editMerchandising(mappedMerchToEdit);
                return res.status(HttpStatus.OK).send(editedMerch);
            } catch (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
            };
        };


    @UseGuards(JwtAuthGuard)
    @Post('merchandisings/:id/delete')
    async deleteMerchandising(
        @Res() res: Response,
        @Param('id') id: number): Promise <{}> {

        try {
            const merchToDelete = await this.merchServices.getMerchandisingById(id);

            if (merchToDelete) {
                await this.merchServices.deleteMerchandising(id);
                return res.status(HttpStatus.OK).json({message: `Merchandising ${id} deleted`});
            };

            return res.status(HttpStatus.BAD_REQUEST).json({message: `Merchandising ${id} do not exist`});
            
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };













};