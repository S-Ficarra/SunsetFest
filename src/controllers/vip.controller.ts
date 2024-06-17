import { Body, Controller, Get, Post, Param, UseGuards, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "src/authentification/jwt-auth.guard";
import { Vip } from "src/domain/models/facility/vip.model";
import { VipService } from "src/services/facility/vip.service";
import { VipDto } from "./DTO/vip.dto";
import { mapVipDtoToModelCreate, mapVipDtoToModelEdit } from "./mappers/vip.mapper";


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
    @Post('vips/createvip')
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
    @Post('vips/:id/editvip')
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
    @Post('vips/:id/deletevip')
    async deleteVip(@Param('id') id: number): Promise<{}> {
        try {
            const vipToDelete = await this.vipServices.getVipById(id);

            if(!vipToDelete){
                return {message: `Vip ${id} do not exist`};
            };

            await this.vipServices.deleteVip(id);
            return {message: `Vip ${id} deleted`};

        } catch (error) {
            return {message: error.message};
        };
    };
};