import { Vip } from "../../models/facility/vip.model"; 

export interface VipRepository {

    getAllVips(): Vip[];
    getVipById(vipId: number): Vip | undefined;
    createVip(vip: Vip): void;
    editVip(vip: Vip): void;
    deleteVip(vipId: number): void;
    
};
