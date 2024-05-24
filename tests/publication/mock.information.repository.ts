import { Content } from "../../src/domain/models/publication/content.model";
import { Information } from "../../src/domain/models/publication/information.model";
import { InformationRepository } from "../../src/domain/repositories/publication/information.repository";

export class MockInformationRepository implements InformationRepository {

    public information: Information[] = [
        new Information (11, new Date, new Date, true, new Content ('titleInformation1', 'textInformation1', new Blob)),
        new Information (33, new Date, new Date, false, new Content ('titleInformation2', 'textInformation2', new Blob))
    ];

    setFakeIdToTest(): void {
        this.information[0].setId(1)
        this.information[1].setId(2)
    };


    getAllInformation(): Information[] {
        return this.information;
    };

    getInformationById(informationId: number): Information | undefined {
        return this.information[informationId -1 ];
    };

    createInformation(information: Information): void {
        this.information.push(information);
        const index = this.information.length;
        information.setId(index);
    };

    editInformation(information: Information): void {
        let informationId = information.getId();
        this.information[informationId - 1] = information;
    };

    deleteInformation(informationId: number): void {
        this.information = this.information.filter(information => information.getId() !== informationId);
    };

};