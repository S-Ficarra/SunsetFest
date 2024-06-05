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


    private async initializeNews(): Promise<void> {
    
        this.news.push(
            new News(this.userRepository.users[0], new Date(), new Date(), true, this.contentRepository.content[0]),
            new News(this.userRepository.users[0], new Date(), new Date(), true, this.contentRepository.content[1])
        );
    };
    

    setFakeIdToTest(): void {
        this.news[0].setId(1)
        this.news[1].setId(2)
    };


    async getAllNews(): Promise<News[]> {
        return this.news;
    };

    async getNewsById(newsId: number): Promise<News> {
        return this.news[newsId -1 ];
    };

    async createNews(news: News): Promise<News> {
        this.news.push(news);
        const index = this.news.length;
        news.setId(index);
        return news;
    };

    async editNews(news: News): Promise<News> {
        let newsId = news.getId();
        this.news[newsId - 1] = news;
        return news;
    };

    async deleteNews(newsId: number): Promise<void> {
        this.news = this.news.filter(news => news.getId() !== newsId);
    };

};