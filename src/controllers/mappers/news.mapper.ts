import { User } from "src/domain/models/user/user.model";
import { NewsDto } from "../DTO/news.dto";
import { Content } from "src/domain/models/publication/content.model";
import { News } from "src/domain/models/publication/news.model";


export function mapNewsDtoToModelCreate (newsDto : NewsDto, image: Buffer, user: User) {

    const content = new Content (
        newsDto.title,
        newsDto.text,
        image
    );

    const news = new News (
        user,
        new Date(),
        new Date(),
        newsDto.status,
        content
    );

    return news;
};

export function mapNewsDtoToModelEdit (newsToEdit: News, newsDto: NewsDto, image: Buffer, user: User) {

    const content = new Content (
        newsDto.title,
        newsDto.text,
        image
    );

    newsToEdit.setContent(content);
    newsToEdit.setUser(user);
    newsToEdit.setStatus(newsDto.status);
    newsToEdit.setModifiedAt(new Date());

    return newsToEdit;
};

