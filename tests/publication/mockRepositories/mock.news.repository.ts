import { MockUserRepository } from "../../user/mock.user.repository";
import { News } from "../../../src/domain/models/publication/news.model";
import { NewsRepository } from "../../../src/domain/repositories/publication/news.repository";
import { MockContentRepository } from "./mock.content.repository";

export class MockNewsRepository implements NewsRepository {

    public userRepository: MockUserRepository;
    public contentRepository: MockContentRepository; //import content mock repo to use Content created in it
    public news: News[] = [];//initialize empty array



    constructor(contentRepository: MockContentRepository, userRepository: MockUserRepository) {
        this. userRepository = userRepository;
        userRepository.setFakeIdToTest();
        this.contentRepository = contentRepository;
        this.initializeNews();//fill the array once contentlRepository is defined
    };


    private initializeNews(): void {
        this.news.push(
            new News(this.userRepository.users[0], new Date(), new Date(), true, this.contentRepository.getContentById(1)),
            new News(this.userRepository.users[0], new Date(), new Date(), true, this.contentRepository.getContentById(2))
        );
    };
    

    setFakeIdToTest(): void {
        this.news[0].setId(1)
        this.news[1].setId(2)
    };


    getAllNews(): News[] {
        return this.news;
    };

    getNewsById(newsId: number): News | undefined {
        return this.news[newsId -1 ];
    };

    createNews(news: News): void {
        this.news.push(news);
        const index = this.news.length;
        news.setId(index);
    };

    editNews(news: News): void {
        let newsId = news.getId();
        this.news[newsId - 1] = news;
    };

    deleteNews(newsId: number): void {
        this.news = this.news.filter(news => news.getId() !== newsId);
    };

};