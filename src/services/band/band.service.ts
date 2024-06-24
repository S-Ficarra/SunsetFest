import { User } from "../../domain/models/user/user.model";
import { Band } from "../../domain/models/band/band.model";
import { BandRepository } from "../../domain/repositories/band/band.repository";
import { RoleService } from "../user/role.service";
import { Inject } from "@nestjs/common";

export class BandService{

    constructor(
        @Inject('BandRepository') private bandRepository: BandRepository,
        private roleService: RoleService,
    ){};

    async getAllBand(): Promise<Band[]>{
        return this.bandRepository.getAllBands();
    };

    async getBandById(bandId: number): Promise<Band>{
        const band = this.bandRepository.getBandById(bandId);
        if (band) {
            return band
        };
        throw new Error (`Band ${bandId} do not exist`)
    };

    async getBandByName(name: string): Promise<Band>{
        const band = this.bandRepository.getBandByName(name);
        if (band) {
            throw new Error ('Band with the same name already exist');
        };
        return undefined;
    }

    async createBand(band: Band): Promise<Band> {
        if (!await this.bandRepository.getBandByName(band.getName())) {
            const bandCreated = this.bandRepository.createBand(band);    
            return bandCreated;   
        };
        throw new Error ('Band with the same name already exist');
    };

    async editBand(band: Band): Promise<Band> {
        if (!await this.bandRepository.getBandByName(band.getName())) {
            this.bandRepository.editBand(band);   
            return band;   
        };
        throw new Error ('Band with the same name already exist');
    };

    async deleteBand(requestingUser: User, bandId: number): Promise<void> {
        if (this.roleService.isAdmin(requestingUser) || this.roleService.isEditor(requestingUser)){
            await this.bandRepository.deleteBand(bandId)
        } else {
            throw new Error ('Unauthorized');
        };
    };

};
