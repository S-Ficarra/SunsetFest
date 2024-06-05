import { Merchandising } from "src/domain/models/facility/shop/merchandising.model";
import { MerchandisingRepository } from "src/domain/repositories/facility/shop/merchandising.repository";

export class MerchandisingService{

    constructor(private merchandisingRepository : MerchandisingRepository){};

    async getAllMerchandising(): Promise<Merchandising[]> {
        return this.merchandisingRepository.getAllMerchandising();
    };

    async getMerchandisingById(merchandisingId: number): Promise<Merchandising> {
        return this.merchandisingRepository.getMerchandisingById(merchandisingId);
    };

    async createMerchandising(merchandising: Merchandising): Promise<Merchandising> {
        this.merchandisingRepository.createMerchandising(merchandising);
        return merchandising;
    };

    async editMerchandising(merchandising: Merchandising): Promise<Merchandising> {
        this.merchandisingRepository.editMerchandising(merchandising);
        return merchandising;
    };

    async deleteMerchandising(merchandisingId: number): Promise<void> {
        this.merchandisingRepository.deleteMerchandising(merchandisingId);
    };

};



