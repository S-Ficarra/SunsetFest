import { User } from "../../../domain/models/user/user.model";
import { IllustratedDto } from "../../DTO/publications/illustrated.dto";
import { Content } from "../../../domain/models/publication/content.model";
import { News } from "../../../domain/models/publication/news.model";


export function mapNewsDtoToModelCreate (newsDto : IllustratedDto, image: Buffer, user: User) {

    const content = new Content (
        newsDto.title,
        newsDto.text,
        image
    );

    const status = newsDto.status === 'true';    

    const news = new News (
        user,
        new Date(),
        new Date(),
        status,
        content
    );

    return news;
};

export function mapNewsDtoToModelEdit (newsToEdit: News, newsDto: IllustratedDto, image: Buffer, user: User) {

    const content = new Content (
        newsDto.title,
        newsDto.text,
        image
    );

    const status = newsDto.status === 'true';


    newsToEdit.setContent(content);
    newsToEdit.setUser(user);
    newsToEdit.setStatus(status);
    newsToEdit.setModifiedAt(new Date());

    return newsToEdit;
};

