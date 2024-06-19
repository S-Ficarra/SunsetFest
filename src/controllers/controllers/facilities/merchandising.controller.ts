import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "src/authentification/jwt-auth.guard";
import { Merchandising } from "src/domain/models/facility/shop/merchandising.model";
import { MerchandisingService } from "src/services/facility/shop/merchandising.service";
import { MerchandisingDto } from "../../DTO/facilities/merchandising.dto";
import { mapMerchandisingDtoToModel, mapMerchandisingDtoToModelEdit } from "../../mappers/facilities/merchandising.mapper";





@Controller()
export class MerchandisingController {


    constructor (private readonly merchServices : MerchandisingService){};


    @UseGuards(JwtAuthGuard)
    @Get('merchandisings')
    async getAllMerchandising(): Promise <Merchandising[] | {}> {
        try {
            return await this.merchServices.getAllMerchandising();
        } catch (error) {
            return {message: error.message};
        };
    };


    @UseGuards(JwtAuthGuard)
    @Get('merchandisings/:id')
    async getMerchandisingById(@Param('id') id: number):Promise <Merchandising | {}> {
        try {
            return await this.merchServices.getMerchandisingById(id);
        } catch (error) {
            return {message: error.message};
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('merchandisings/createmerchandising')
    async createMerchandising (@Body(new ValidationPipe()) createMerchDto: MerchandisingDto): Promise <Merchandising | {}> {
        try {
            const merchToCreate = mapMerchandisingDtoToModel(createMerchDto);
            const merchCreated = await this.merchServices.createMerchandising(merchToCreate);
            return merchCreated;
        } catch (error) {
            return {message: error.message};
        };
    };



    @UseGuards(JwtAuthGuard)
    @Post('merchandisings/:id/editmerchandising')
    async editMerchandising(
        @Param('id') id: number,
        @Body(new ValidationPipe()) editMerchDto: MerchandisingDto): Promise <Merchandising | {}> {

            try {
                console.log(editMerchDto);
                
                const merchToEdit = await this.merchServices.getMerchandisingById(id);
                console.log(merchToEdit);
                
                
                const mappedMerchToEdit = mapMerchandisingDtoToModelEdit(merchToEdit, editMerchDto);
                const editedMerch = await this.merchServices.editMerchandising(mappedMerchToEdit);
                return editedMerch;
            } catch (error) {
                return {message: error.message};
            };
        };


    @UseGuards(JwtAuthGuard)
    @Post('merchandisings/:id/deletemerchandising')
    async deleteMerchandising(@Param('id') id: number,): Promise <{}> {

        try {
            const merchToDelete = await this.merchServices.getMerchandisingById(id);

            if (!merchToDelete) {
                return {message: `Merchandising ${id} do not exist`};
            };

            await this.merchServices.deleteMerchandising(id);
            return {message: `Merchandising ${id} deleted`};   
            
        } catch (error) {
            return {message: error.message};
        };
    };













};