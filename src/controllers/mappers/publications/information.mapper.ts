import { Content } from "../../../domain/models/publication/content.model";
import { User } from "../../../domain/models/user/user.model";
import { IllustratedDto } from "../../DTO/publications/illustrated.dto";
import { Information } from "../../../domain/models/publication/information.model";

export function mapInformationDtoToModelCreate (informationDto : IllustratedDto, imageUrl: string, user: User) {

    const content = new Content (
        informationDto.title,
        informationDto.text,
        imageUrl
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

export function mapInformationDtoToModelEdit (infoToEdit: Information, informationDto: IllustratedDto, imageUrl: string, user: User) {

    const content = new Content (
        informationDto.title,
        informationDto.text,
        imageUrl
    );

    const status = informationDto.status === 'true';

    infoToEdit.setContent(content);
    infoToEdit.setUser(user);
    infoToEdit.setStatus(status);
    infoToEdit.setModifiedAt(new Date());

    return infoToEdit;
};
