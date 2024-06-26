import { Vip } from "../../src/domain/models/facility/vip.model";
import { VipService } from "../../src/services/facility/vip.service";
import { MockVipRepository } from "./mockRepositories/mock.vip.repository";


describe('VipService', () => {
    let vipService: VipService;
    let vipRepository: MockVipRepository;


    beforeEach(() => {
        vipRepository = new MockVipRepository();
        vipService = new VipService(vipRepository/*, facilityService*/);
        vipRepository.setFakeIdToTest();
    });

    //getAllVips
    it('Should return all vips', async () => {
        const vips = await vipService.getAllVips();
        expect(vips).toHaveLength(2);
        expect(vips).toEqual(expect.arrayContaining([
            expect.objectContaining({_name: 'hell zone'}),
            expect.objectContaining({_name: 'glam zone'})
        ]));
    });


    //getVipById
    it('Should return the vip id 1 with the question: question 1', async () => {
        const foundVip1 = await vipService.getVipById(1);
        expect(foundVip1).toEqual(expect.objectContaining({_name: 'hell zone'}));
    });


    //createVip
    it('should return the new vip created', async () => {
        let foundVip3 = new Vip ('red zone', 987.459, 415.596);
        await vipService.createVip(foundVip3);
        expect(foundVip3).toEqual(expect.objectContaining({_name: 'red zone'}));
    });


    //editVip
    it('should return the vip1 with question and answer edited', async () => {
        let editedVip = new Vip ('red zone', 125.366, 125.258);
        editedVip.setId(1);
        let foundVipEdited = await vipService.editVip(editedVip);
        expect(foundVipEdited).toEqual(expect.objectContaining({_name: 'red zone'}));        
    });


    //deleteVip
    it('should return the vips array without the vip with id1', async () => {
        vipService.deleteVip(1)
        let allVips = await vipRepository.vips
        expect(allVips.some(vips => vips.getId() === 1)).toBeFalsy();
    });


});
