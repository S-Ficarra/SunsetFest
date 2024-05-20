import { Merchandising } from "../../../models/facility/shop/merchandising.model";
import { ShopRepository } from "./shop.repository";

export interface MerchandisingRepository extends ShopRepository{

    getAllMerchandising(): Merchandising[];
    getMerchandisingById(id: number): Merchandising | undefined;
    createMerchandising(merchandising: Merchandising): void;
    editMerchandising(merchandising: Merchandising): void;
    deleteMerchandising(id: number): void;

};
