import { Merchandising } from "src/domain/models/facility/shop/merchandising.model";
import { MerchandisingRepository } from "src/domain/repositories/facility/shop/merchandising.repository";

export class MerchandisingService{

    constructor(private merchandisingRepository : MerchandisingRepository){};

    getAllMerchandising(): Merchandising[] {
        return this.merchandisingRepository.getAllMerchandising();
    };

    getMerchandisingById(merchandisingId: number): Merchandising {
        return this.merchandisingRepository.getMerchandisingById(merchandisingId);
    };

    createMerchandising(merchandising: Merchandising): Merchandising {
        this.merchandisingRepository.createMerchandising(merchandising);
        return merchandising;
    };

    editMerchandising(merchandising: Merchandising): Merchandising {
        this.merchandisingRepository.editMerchandising(merchandising);
        return merchandising;
    };

    deleteMerchandising(merchandisingId: number): void {
        this.merchandisingRepository.deleteMerchandising(merchandisingId);
    };

};



