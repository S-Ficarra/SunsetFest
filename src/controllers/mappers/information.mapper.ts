import { Content } from "src/domain/models/publication/content.model";
import { News } from "src/domain/models/publication/news.model";
import { User } from "src/domain/models/user/user.model";
import { IllustratedDto } from "../DTO/illustrated.dto";
import { Information } from "src/domain/models/publication/information.model";

export function mapInformationDtoToModelCreate (informationDto : IllustratedDto, image: Buffer, user: User) {

    const content = new Content (
        informationDto.title,
        informationDto.text,
        image
    );

    const status = informationDto.status === 'true';    

    const information = new Information (
        user,
        new Date(),
        new Date(),
        status,
        content
    );

    return information;
};

export function mapInformationDtoToModelEdit (infoToEdit: Information, informationDto: IllustratedDto, image: Buffer, user: User) {

    const content = new Content (
        informationDto.title,
        informationDto.text,
        image
    );

    const status = informationDto.status === 'true';


    infoToEdit.setContent(content);
    infoToEdit.setUser(user);
    infoToEdit.setStatus(status);
    infoToEdit.setModifiedAt(new Date());

    return infoToEdit;
};
