import { Vip } from "src/domain/models/facility/vip.model";
import { VipRepository } from "src/domain/repositories/facility/vip.repository";

export class VipService {

    constructor(private vipRepository : VipRepository){};

    async getAllVips(): Promise<Vip[]> {
        return this.vipRepository.getAllVips();
    };

    async getVipById(vipId: number): Promise<Vip> {
        return this.vipRepository.getVipById(vipId);
    };

    async createVip(vip: Vip): Promise<Vip> {
        this.vipRepository.createVip(vip);
        return vip;
    };

    async editVip(vip: Vip): Promise<Vip> {
        this.vipRepository.editVip(vip);
        return vip;
    };

    async deleteVip(vipId: number): Promise<void> {
        this.vipRepository.deleteVip(vipId);
    };

};