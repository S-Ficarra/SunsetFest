import { Merchandising } from "../../../models/facility/shop/merchandising.model";

export interface MerchandisingRepository {

    getAllMerchandising(): Merchandising[];
    getMerchandisingById(merchandisingId: number): Merchandising | undefined;
    createMerchandising(merchandising: Merchandising): void;
    editMerchandising(merchandising: Merchandising): void;
    deleteMerchandising(merchandisingId: number): void;

};
