import { Bar } from "src/domain/models/facility/shop/bar.model";
import { BarRepository } from "src/domain/repositories/facility/shop/bar.repository";

export class BarService implements BarRepository {

    constructor(private barRepository : BarRepository){}
    
    
    async getAllBars(): Promise<Bar[]> {
        return this.barRepository.getAllBars();
    };

    async getBarById(barId: number): Promise<Bar> {
        return this.barRepository.getBarById(barId);
    };

    async createBar(bar: Bar): Promise<Bar> {
        this.barRepository.createBar(bar);
        return bar;
    };

    async editBar(bar: Bar): Promise<Bar> {
        this.barRepository.editBar(bar);
        return bar;
    };

    async deleteBar(barId: number): Promise<void> {
        this.barRepository.deleteBar(barId);
    };

};