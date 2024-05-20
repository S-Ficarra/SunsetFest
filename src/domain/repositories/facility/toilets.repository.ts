import { Toilet } from "../../models/facility/toilet.model"; 

export interface ToiletRepository {

    getAllToilets(): Toilet[];
    getToiletById(id: number): Toilet | undefined;
    createToilet(toilet: Toilet): void;
    editToilet(toilet: Toilet): void;
    deleteToilet(id: number): void;

};
