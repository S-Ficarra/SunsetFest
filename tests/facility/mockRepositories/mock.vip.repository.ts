import { Vip } from "../../../src/domain/models/facility/vip.model";
import { VipRepository } from "../../../src/domain/repositories/facility/vip.repository";

export class MockVipRepository implements VipRepository {


    public vips: Vip[] = [
        new Vip ('hell zone', 125.366, 125.258),
        new Vip ('glam zone', 366.125, 852.258),
    ];

    setFakeIdToTest(): void {
        this.vips[0].setId(1)
        this.vips[1].setId(2)
    };

    getAllVips(): Vip[] {
        return this.vips;
    };

    getVipById(vipId: number): Vip {
        return this.vips[vipId - 1];
    };

    createVip(vip: Vip): void {
        this.vips.push(vip);
    };

    editVip(vip: Vip): void {
        let vipId = vip.getId();
        this.vips[vipId - 1] = vip;
    };
    
    deleteVip(vipId: number): void {
        this.vips = this.vips.filter(vip => vip.getId() !== vipId);
    };

};