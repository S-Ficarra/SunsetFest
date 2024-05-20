import { Vip } from "../../models/facility/vip.model"; 
import { Facility } from "../../models/facility/facility.model";

export interface VipRepository {

    getAllVips(): Vip[];
    getVipById(id: number): Vip | undefined;
    createVip(vip: Vip): void;
    editVip(vip: Vip): void;
    deleteVip(id: number): void;
    addFacilityToVip(facility: Facility): void;
    deleteFacilityFromVip(facilityId: number): void;    

};
