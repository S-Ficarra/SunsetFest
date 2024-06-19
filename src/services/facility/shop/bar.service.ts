import { Inject } from "@nestjs/common";
import { Bar } from "src/domain/models/facility/shop/bar.model";
import { BarRepository } from "src/domain/repositories/facility/shop/bar.repository";

export class BarService implements BarRepository {

    constructor( @Inject('BarRepository') private barRepository : BarRepository){}
    
    
    async getAllBars(): Promise<Bar[]> {
        return await this.barRepository.getAllBars();
    };

    async getBarById(barId: number): Promise<Bar> {
        const bar = await this.barRepository.getBarById(barId);
        if (bar) {
            return bar;
        };
        throw new Error (`Bar ${barId} do not exist`);
    };

    async createBar(bar: Bar): Promise<Bar> {
        const barCreated = await this.barRepository.createBar(bar);
        return barCreated;
    };

    async editBar(bar: Bar): Promise<Bar> {
        const barEdited = await this.barRepository.editBar(bar);
        return barEdited;
    };

    async deleteBar(barId: number): Promise<void> {
        await this.barRepository.deleteBar(barId);
    };

};