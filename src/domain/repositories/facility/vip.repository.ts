import { Vip } from "../../models/facility/vip.model"; 

export interface VipRepository {

    getAllVips(): Promise <Vip[]>;
    getVipById(vipId: number): Promise <Vip | undefined>;
    createVip(vip: Vip): Promise <Vip>;
    editVip(vip: Vip): Promise <Vip>;
    deleteVip(vipId: number): Promise <void>;
    
};
