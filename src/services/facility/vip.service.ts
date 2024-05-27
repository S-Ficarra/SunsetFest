import { Vip } from "src/domain/models/facility/vip.model";
import { VipRepository } from "src/domain/repositories/facility/vip.repository";

export class VipService {

    constructor(private vipRepository : VipRepository){};

    getAllVips(): Vip[] {
        return this.vipRepository.getAllVips();
    };

    getVipById(vipId: number): Vip {
        return this.vipRepository.getVipById(vipId);
    };

    createVip(vip: Vip): Vip {
        this.vipRepository.createVip(vip);
        return vip;
    };

    editVip(vip: Vip): Vip {
        this.vipRepository.editVip(vip);
        return vip;
    };

    deleteVip(vipId: number): void {
        this.vipRepository.deleteVip(vipId);
    };

};