/* import { Repository } from 'typeorm';
import { News } from 'src/domain/models/publication/news.model';
import { NewsRepository } from '../../domain/repositories/publication/news.repository'
import { InjectRepository } from '@nestjs/typeorm';
import { publications } from '../entities/publications.entity';
import { publication_contents } from '../entities/publication_contents.entity';
import { publication_details } from '../entities/publication_details.entity';
import { publication_types } from '../entities/publication_types.entity';

export class NewsRepositoryImpl implements NewsRepository {
  constructor(
    @InjectRepository(publications)
    private newsRepository: Repository<publications>,
    @InjectRepository(publication_contents)
    private contentRepository: Repository<publication_contents>,
    @InjectRepository(publication_details)
    private detailsRepository: Repository<publication_details>,
    @InjectRepository(publication_types)
    private typesRepository: Repository<publication_types>,
  ) {}


  async createNews(news: News): Promise<void> {
    const content = new publication_contents();
    content.title = news.getContent().getTitle();
    content.text = news.getContent().getText();
    await this.contentRepository.save(content);

    const details = new publication_details();
    details.author_ = news.getUser().getId();
    details.created_at = news.getCreatedAt();
    details.modified_at = news.getModifiedAt();
    details.status = news.getStatus();
    await this.detailsRepository.save(details);

    const type = new publication_types();
    type.type = news.getType();
    await this.typesRepository.save(type);

    const publication = new publications();
    publication.publication__contents_ = content.id;
    publication.publication__details_ = details.id;
    publication.publication__types_ = type.id;
    await this.newsRepository.save(publication);
  }


  getAllNews(): News[] {
    // Fetch all publications from the database
    const publications = this.newsRepository.find({
      relations: ['publication__contents_', 'publication__details_', 'publication__types_'],
    });
  
    // Convert each publication to a News object
    const news: News[] = publications.map((publication) => {
      const content = publication.publication__contents_;
      const details = publication.publication__details_;
      const type = publication.publication__types_;
  
      // Assuming user information is stored elsewhere
      const user = { id: 0 }; // Placeholder for user object

      return new News(user, details.created_at, details.modifiedAt, details.status, content);
    });
  
    return news;
  };



    getNewsById(newsId: number): News {
        throw new Error('Method not implemented.');
    }
    editNews(news: News): void {
        throw new Error('Method not implemented.');
    }
    deleteNews(newsId: number): void {
        throw new Error('Method not implemented.');
    }
}
 */