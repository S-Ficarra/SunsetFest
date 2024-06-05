import { Facility } from "../../models/facility/facility.model";
import { Map } from "../../models/facility/map.model";

export interface MapRepository {

    getMap(): Promise <Map | undefined>;
    createMap(map: Map): Promise <Map>;
    addFacilityToMap(facility: Facility): Promise <void>;
    deleteFacilityFromMap(facilityId: number): Promise <void>;    

};
