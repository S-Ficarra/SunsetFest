import { Toilet } from "../../models/facility/toilet.model"; 

export interface ToiletRepository {

    getAllToilets(): Toilet[];
    getToiletById(toiletId: number): Toilet | undefined;
    createToilet(toilet: Toilet): void;
    editToilet(toilet: Toilet): void;
    deleteToilet(toiletId: number): void;

};
