import { Body, Controller, Get, Post, Param, UseGuards, ValidationPipe } from "@nestjs/common";
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
    

    @UseGuards(JwtAuthGuard)
    @Get('vips')
    async getAllVips(): Promise <Vip | {}> {
        try {
            return await this.vipServices.getAllVips()
        } catch (error) {
            return {message: error.message}
        };
    };


    @UseGuards(JwtAuthGuard)
    @Get('vips/:id')
    async getVipById(@Param('id') id: number): Promise <Vip | {}> {
        try {
            return await this.vipServices.getVipById(id);
        } catch (error) {
            return {message: error.message};
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('vips/create')
    async createVip(@Body(new ValidationPipe()) createVipDto: VipDto): Promise <Vip | {}> {
        try {
            const vipToCreate = mapVipDtoToModelCreate(createVipDto);
            const vipCreated = await this.vipServices.createVip(vipToCreate);
            return vipCreated;
        } catch (error) {
            return {message: error.message};
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('vips/:id/edit')
    async editVip(
        @Param('id') id: number,
        @Body(new ValidationPipe()) editVipDto: VipDto): Promise <Vip | {}> {
            try {
                const vipToEdit = await this.vipServices.getVipById(id);
                const mappedVipToEdit = mapVipDtoToModelEdit(vipToEdit, editVipDto);
                const vipEdited = await this.vipServices.editVip(mappedVipToEdit);
                return vipEdited;
            } catch (error) {
                return {message: error.message};
            };
        };


    @UseGuards(JwtAuthGuard)
    @Post('vips/:id/delete')
    async deleteVip(@Param('id') id: number): Promise<{}> {
        try {
            const vipToDelete = await this.vipServices.getVipById(id);

            if(vipToDelete){
                await this.vipServices.deleteVip(id);
                return {message: `Vip ${id} deleted`};
            };

            return {message: `Vip ${id} do not exist`};           

        } catch (error) {
            return {message: error.message};
        };
    };
};