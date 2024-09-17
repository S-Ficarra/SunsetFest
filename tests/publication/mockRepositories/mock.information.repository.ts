import { MockUserRepository } from "tests/user/mock.user.repository";
import { Content } from "../../../src/domain/models/publication/content.model";
import { Information } from "../../../src/domain/models/publication/information.model";
import { InformationRepository } from "../../../src/domain/repositories/publication/information.repository";
import { MockContentRepository } from "./mock.content.repository";

export class MockInformationRepository implements InformationRepository {

    public userRepository : MockUserRepository;
    public contentRepository: MockContentRepository; //import content mock repo to use Content created in it
    public informations : Information[] = [];



    constructor(contentRepository: MockContentRepository, userRepository : MockUserRepository){
        this.contentRepository = contentRepository;
        this.userRepository = userRepository;
        userRepository.setFakeIdToTest();
        contentRepository.setFakeIdToTest();
        this.initializeInformations()
    }

    initializeInformations(): void {
        this.informations.push(
            new Information (this.userRepository.users[0], new Date, new Date, true, new Content ('titleInformation1', 'textInformation1', 'image1')),
            new Information (this.userRepository.users[0], new Date, new Date, false, new Content ('titleInformation2', 'textInformation2', 'image2'))
        )
    }


    setFakeIdToTest(): void {
        this.informations[0].setId(1)
        this.informations[1].setId(2)
    };


    async getAllInformation(): Promise<Information[]> {
        return this.informations;
    };

    async getInformationById(informationId: number): Promise<Information> {
        return this.informations[informationId -1 ];
    };

    async createInformation(information: Information): Promise<Information> {
        this.informations.push(information);
        const index = this.informations.length;
        information.setId(index);
        return information;
    };

    async editInformation(information: Information): Promise<Information> {
        let informationId = information.getId();
        this.informations[informationId - 1] = information;
        return information;
    };

    async deleteInformation(informationId: number): Promise<void> {
        this.informations = this.informations.filter(information => information.getId() !== informationId);
    };

};