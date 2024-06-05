import { Toilet } from "../../models/facility/toilet.model"; 

export interface ToiletRepository {

    getAllToilets(): Promise <Toilet[]>;
    getToiletById(toiletId: number): Promise <Toilet | undefined>;
    createToilet(toilet: Toilet): Promise <Toilet>;
    editToilet(toilet: Toilet): Promise <Toilet>;
    deleteToilet(toiletId: number): Promise <void>;

};
