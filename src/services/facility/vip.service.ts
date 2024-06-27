import { Inject } from "@nestjs/common";
import { Vip } from "src/domain/models/facility/vip.model";
import { VipRepository } from "src/domain/repositories/facility/vip.repository";

export class VipService {

    constructor(@Inject('VipRepository') private vipRepository : VipRepository){};

    async getAllVips(): Promise<Vip[]> {
        return await this.vipRepository.getAllVips();
    };

    async getVipById(vipId: number): Promise<Vip> {
        const vip = await this.vipRepository.getVipById(vipId);
        if(vip){
            return vip;
        };
        throw new Error (`Vip ${vipId} do not exist`);
    };

    async createVip(vip: Vip): Promise<Vip> {
        await this.vipRepository.createVip(vip);
        return vip;
    };

    async editVip(vip: Vip): Promise<Vip> {
        await this.vipRepository.editVip(vip);
        return vip;
    };

    async deleteVip(vipId: number): Promise<void> {
        await this.vipRepository.deleteVip(vipId);
    };

};