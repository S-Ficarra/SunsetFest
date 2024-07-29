import { Body, Controller, Get, Post, Param, UseGuards, ValidationPipe, HttpStatus, Res } from "@nestjs/common";
import { Response } from 'express';
import { JwtAuthGuard } from "../../../authentification/jwt-auth.guard";
import { Vip } from "../../../domain/models/facility/vip.model";
import { VipService } from "../../../services/facility/vip.service";
import { VipDto } from "../../DTO/facilities/vip.dto";
import { mapVipDtoToModelCreate, mapVipDtoToModelEdit } from "../../mappers/facilities/vip.mapper";


@Controller()
export class VipController {

    
    constructor (
        private readonly vipServices : VipService,
    ){};
    

    @Get('vips')
    async getAllVips(@Res() res: Response): Promise <Vip | {}> {
        try {
            const allVips = await this.vipServices.getAllVips()
            return res.status(HttpStatus.OK).send(allVips);

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };


    @Get('vips/:id')
    async getVipById(
        @Res() res: Response,
        @Param('id') id: number): Promise <Vip | {}> {
        try {
            const vip = await this.vipServices.getVipById(id);
            return res.status(HttpStatus.OK).send(vip);

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('vips/create')
    async createVip(
        @Res() res: Response,
        @Body(new ValidationPipe()) createVipDto: VipDto): Promise <Vip | {}> {
        try {
            const vipToCreate = mapVipDtoToModelCreate(createVipDto);
            const vipCreated = await this.vipServices.createVip(vipToCreate);
            return res.status(HttpStatus.OK).send(vipCreated);

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('vips/:id/edit')
    async editVip(
        @Res() res: Response,
        @Param('id') id: number,
        @Body(new ValidationPipe()) editVipDto: VipDto): Promise <Vip | {}> {
            try {
                const vipToEdit = await this.vipServices.getVipById(id);
                const mappedVipToEdit = mapVipDtoToModelEdit(vipToEdit, editVipDto);
                const vipEdited = await this.vipServices.editVip(mappedVipToEdit);
                return res.status(HttpStatus.OK).send(vipEdited);
            } catch (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
            };
        };


    @UseGuards(JwtAuthGuard)
    @Post('vips/:id/delete')
    async deleteVip(
        @Res() res: Response,
        @Param('id') id: number): Promise<{}> {
        try {
            const vipToDelete = await this.vipServices.getVipById(id);

            if(vipToDelete){
                await this.vipServices.deleteVip(id);
                return res.status(HttpStatus.OK).json({message: `Vip ${id} deleted`});
            };

            return res.status(HttpStatus.BAD_REQUEST).json({message: `Vip ${id} do not exist`});
        

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});         
        };
    };
};