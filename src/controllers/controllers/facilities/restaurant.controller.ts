import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe, HttpStatus, Res } from "@nestjs/common";
import { Response } from 'express';
import { JwtAuthGuard } from "../../../authentification/jwt-auth.guard";
import { Restaurant } from "../../../domain/models/facility/shop/restaurant.model";
import { RestaurantService } from "../../../services/facility/shop/restaurant.service";
import { RestaurantDto } from "../../DTO/facilities/restaurant.dto";
import { mapRestaurantDtoToModel, mapRestaurantDtoToModelEdit } from "../../mappers/facilities/restaurant.mapper";



@Controller()
export class RestaurantController {


    constructor(private readonly restaurantService: RestaurantService){};


    @Get('restaurants')
    async getAllRestaurant(@Res() res: Response): Promise<Restaurant[] | {}> {
        try {
            const allRestaurants = await this.restaurantService.getAllRestaurants();
            return res.status(HttpStatus.OK).send(allRestaurants);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };


    @Get('restaurants/:id')
    async getRestaurantById(
        @Res() res: Response,
        @Param('id') id: number): Promise <Restaurant | {}> {
        try {
            const restaurant = await this.restaurantService.getRestaurantById(id);
            return res.status(HttpStatus.OK).send(restaurant);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('restaurants/create')
    async createRestaurant (
        @Res() res: Response,
        @Body(new ValidationPipe()) createRestaurantDto: RestaurantDto): Promise <Restaurant | {}> {
        try {
            const restaurantToCreate = mapRestaurantDtoToModel(createRestaurantDto);
            const restaurantCreated = await this.restaurantService.createRestaurant(restaurantToCreate);
            return res.status(HttpStatus.OK).send(restaurantCreated);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };


    @UseGuards(JwtAuthGuard)
    @Post('restaurants/:id/edit')
    async editRestaurant (
        @Res() res: Response,
        @Param('id') id: number, 
        @Body(new ValidationPipe()) editRestaurantDto: RestaurantDto): Promise<Restaurant | {}> {

            try {               
                const restaurantToEdit = await this.restaurantService.getRestaurantById(id);       
                const mappedRestaurantToEdit = mapRestaurantDtoToModelEdit(restaurantToEdit, editRestaurantDto);
                const restaurantEdited = await this.restaurantService.editRestaurant(mappedRestaurantToEdit);
                return res.status(HttpStatus.OK).send(restaurantEdited);
            } catch (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
            };
        };


    @UseGuards(JwtAuthGuard)
    @Post('restaurants/:id/delete')
    async deleteBar(
        @Res() res: Response,
        @Param('id') id: number): Promise<{}> {

        try {
            const restaurantToDelete = await this.restaurantService.getRestaurantById(id);  
            
            if (restaurantToDelete) {
                await this.restaurantService.deleteRestaurant(id);
                return res.status(HttpStatus.OK).json({message: `Restaurant ${id} deleted`});
            };

            return res.status(HttpStatus.BAD_REQUEST).json({message: `Restaurant ${id} do not exist`});

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : error.message});
        };
    };


};