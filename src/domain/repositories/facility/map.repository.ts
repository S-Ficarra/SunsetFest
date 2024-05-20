import { Facility } from "../../models/facility/facility.model";
import { Map } from "../../models/facility/map.model";

export interface MapRepository {

    getMap(): Map | undefined;
    createMap(map: Map): void;
    addFacilityToMap(facility: Facility): void;
    deleteFacilityFromMap(facilityId: number): void;    

};
