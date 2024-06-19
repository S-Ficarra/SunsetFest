import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "src/authentification/jwt-auth.guard";
import { Restaurant } from "src/domain/models/facility/shop/restaurant.model";
import { RestaurantService } from "src/services/facility/shop/restaurant.service";
import { RestaurantDto } from "./DTO/restaurant.dto";
import { mapRestaurantDtoToModel, mapRestaurantDtoToModelEdit } from "./mappers/restaurant.mapper";



@Controller()
export class RestaurantController {


    constructor(private readonly restaurantService: RestaurantService){};


    @UseGuards(JwtAuthGuard)
    @Get('restaurants')
    async getAllRestaurant(): Promise<Restaurant[] | {}> {
        try {
            return await this.restaurantService.getAllRestaurants();
        } catch (error) {
            return {message: error.message};
        };
    };


    @UseGuards(JwtAuthGuard)
    @Get('restaurants/:id')
    async getRestaurantById(@Param('id') id: number): Promise <Restaurant | {}> {
        try {
            return await this.restaurantService.getRestaurantById(id);
        } catch (error) {
            return {message: error.message};
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('restaurants/createrestaurant')
    async createRestaurant (@Body(new ValidationPipe()) createRestaurantDto: RestaurantDto): Promise <Restaurant | {}> {
        try {
            const restaurantToCreate = mapRestaurantDtoToModel(createRestaurantDto);
            const restaurantCreated = await this.restaurantService.createRestaurant(restaurantToCreate);
            return restaurantCreated;
        } catch (error) {
            return {message: error.message};
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('restaurants/:id/editrestaurant')
    async editRestaurant (
        @Param('id') id: number, 
        @Body(new ValidationPipe()) editRestaurantDto: RestaurantDto): Promise<Restaurant | {}> {

            try {               
                const restaurantToEdit = await this.restaurantService.getRestaurantById(id);       
                const mappedRestaurantToEdit = mapRestaurantDtoToModelEdit(restaurantToEdit, editRestaurantDto);
                const restaurantEdited = await this.restaurantService.editRestaurant(mappedRestaurantToEdit);
                return restaurantEdited;
            } catch (error) {
                return {message: error.message};
            };
        };


    @UseGuards(JwtAuthGuard)
    @Post('restaurants/:id/deleterestaurant')
    async deleteBar(@Param('id') id: number): Promise<{}> {

        try {
            const restaurantToDelete = await this.restaurantService.getRestaurantById(id);  
            
            if (!restaurantToDelete) {
                return {message: `Restaurant ${id} do not exist`};
            };

            await this.restaurantService.deleteRestaurant(id);
            return {message: `Restaurant ${id} deleted`};   

        } catch (error) {
            return {message: error.message};
        };
    };


};