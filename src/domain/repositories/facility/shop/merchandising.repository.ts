import { Merchandising } from "../../../models/facility/shop/merchandising.model";

export interface MerchandisingRepository {

    getAllMerchandising(): Promise <Merchandising[]>;
    getMerchandisingById(merchandisingId: number): Promise <Merchandising | undefined>;
    createMerchandising(merchandising: Merchandising): Promise <Merchandising>;
    editMerchandising(merchandising: Merchandising): Promise <Merchandising>;
    deleteMerchandising(merchandisingId: number): Promise <void>;

};
