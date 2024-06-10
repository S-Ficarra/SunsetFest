import { Bar } from "../../../models/facility/shop/bar.model"; 

export interface BarRepository {

    getAllBars(): Promise <Bar[]>;
    getBarById(barId: number): Promise <Bar | undefined>;
    createBar(bar: Bar): Promise <Bar>;
    editBar(bar: Bar): Promise <Bar>;
    deleteBar(barId: number): Promise <void>;

};
