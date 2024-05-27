import { News } from "../../src/domain/models/publication/news.model";
import { NewsService } from "../../src/services/publication/news.service";
import { MockNewsRepository } from "./mockRepositories/mock.news.repository";
import { Content } from "../../src/domain/models/publication/content.model";
import { ContentService } from "../../src/services/publication/content.service";
import { MockContentRepository } from "./mockRepositories/mock.content.repository";



describe('NewsService', () => {
    let contentService: ContentService;
    let contentRepository: MockContentRepository;
    let newsService: NewsService;
    let newsRepository: MockNewsRepository;


    beforeEach(() => {
        contentRepository = new MockContentRepository;
        contentService = new ContentService(contentRepository);
        newsRepository= new MockNewsRepository(contentRepository);
        newsService = new NewsService(newsRepository, contentService/*, publicationService*/);
        newsRepository.setFakeIdToTest(); //attributes id to elements of the array where the methods are tested
        contentRepository.setFakeIdToTest();
    });
    
    //getAllNews
    it('should return all news', () => {
        const news = newsService.getAllNews();
        expect(news).toHaveLength(2);
        expect(news).toEqual(expect.arrayContaining([
            expect.objectContaining({_type: 'news', _content: expect.objectContaining({_title: 'title1'})}),
            expect.objectContaining({_type: 'news', _content: expect.objectContaining({_title: 'title2'})})
        ]));
    });

    //getNewsById
    it("should return a news by it's id", () => {
        let foundNews1 = newsService.getNewsById(1);
        expect(foundNews1).toEqual(expect.objectContaining({_type: 'news', _content: expect.objectContaining({_title: 'title1'})}));

    });


    //createNews
    it('should return a news just created', () => {
        const foundNews3 = new News (1, new Date, new Date, true, new Content('title3', 'text3', new Blob));  
        newsService.createNews(foundNews3); 
        expect(foundNews3).toEqual(expect.objectContaining({ _id: 3, _type: 'news', _content: expect.objectContaining({_title: 'title3'})}));

    });

    
    //editNews
    it('should return a news with titleEdited and textEdited', () => {
        const newsEdited = new News (1, new Date, new Date, true, new Content('titleEdited', 'textEdited', new Blob));
        newsEdited.setId(1)
        newsEdited.getContent().setId(1)
        const foundNewsEdited = newsService.editNews(newsEdited);
        expect(foundNewsEdited).toEqual(expect.objectContaining({ _content: expect.objectContaining({_title: 'titleEdited', _text: 'textEdited'})}));

    })


    //deleteNews
    it('should return the news list without the one with id 3', () => {
        const newsToDelete = newsService.getNewsById(1);
        newsService.deleteNews(newsToDelete.getId())
        expect(newsRepository.news.some(news => news.getId() === 1)).toBeFalsy();

    })



});