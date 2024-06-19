import { Inject } from "@nestjs/common";
import { Merchandising } from "src/domain/models/facility/shop/merchandising.model";
import { MerchandisingRepository } from "src/domain/repositories/facility/shop/merchandising.repository";

export class MerchandisingService{

    constructor( @Inject('MerchandisingRepository') private merchandisingRepository : MerchandisingRepository){};

    async getAllMerchandising(): Promise<Merchandising[]> {
        return await this.merchandisingRepository.getAllMerchandising();
    };

    async getMerchandisingById(merchandisingId: number): Promise<Merchandising> {
        const merchandising = await this.merchandisingRepository.getMerchandisingById(merchandisingId);
        if (merchandising) {
            return merchandising;
        };
        throw new Error (`Merchandising ${merchandisingId} do not exist`);

    };

    async createMerchandising(merchandising: Merchandising): Promise<Merchandising> {
        const createdMerch = await this.merchandisingRepository.createMerchandising(merchandising);
        return createdMerch;
    };

    async editMerchandising(merchandising: Merchandising): Promise<Merchandising> {
        const editedMerch = await this.merchandisingRepository.editMerchandising(merchandising);
        return editedMerch;
    };

    async deleteMerchandising(merchandisingId: number): Promise<void> {
        await this.merchandisingRepository.deleteMerchandising(merchandisingId);
    };

};



