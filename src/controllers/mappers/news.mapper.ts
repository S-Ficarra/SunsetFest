import { User } from "src/domain/models/user/user.model";
import { IllustratedDto } from "../DTO/illustrated.dto";
import { Content } from "src/domain/models/publication/content.model";
import { News } from "src/domain/models/publication/news.model";


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

