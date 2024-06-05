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

    async getAllVips(): Promise<Vip[]> {
        return this.vips;
    };

    async getVipById(vipId: number): Promise<Vip> {
        return this.vips[vipId - 1];
    };

    async createVip(vip: Vip): Promise<Vip> {
        this.vips.push(vip);
        return vip;
    };

    async editVip(vip: Vip): Promise<Vip> {
        let vipId = vip.getId();
        this.vips[vipId - 1] = vip;
        return vip;
    };
    
    async deleteVip(vipId: number): Promise<void> {
        this.vips = this.vips.filter(vip => vip.getId() !== vipId);
    };

};