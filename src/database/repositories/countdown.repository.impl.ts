import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Countdown } from 'src/domain/models/countdown.model';
import { countdowns } from '../entities/countdowns.entity';
import { CountdownRepository } from 'src/domain/repositories/countdown.repository';
import { mapCountdownEntitytoModel, mapCountdownModeltoEntity } from '../mappers/countdown.mapper';

export class CountdownRepositoryImpl implements CountdownRepository {


    constructor(
        @InjectRepository(countdowns)
        private countdownRepository: Repository<countdowns>,
    ) {}


    async getAllCountdowns(): Promise<Countdown[]> {
        const allCountdowns = await this.countdownRepository.find();
        const mappedCountdownPromises =  allCountdowns.map( async countdown_entity => {
            return mapCountdownEntitytoModel(countdown_entity);
        });
        return Promise.all(mappedCountdownPromises);
    };

    async getCountdownById(countdownId: number): Promise<Countdown> {
        const countdown_entity = await this.countdownRepository.findOneBy({id: countdownId});
        return mapCountdownEntitytoModel(countdown_entity);
    };

    async createCountdown(countdown: Countdown): Promise<Countdown> {
        const countdown_entity = mapCountdownModeltoEntity(countdown);
        const createdCountdown = await this.countdownRepository.save(countdown_entity);
        countdown.setId(createdCountdown.id);
        return countdown;
    };

    async editCountdown(countdown: Countdown): Promise<Countdown> {
        const countdown_entity = mapCountdownModeltoEntity(countdown);
        const editedCountdown = await this.countdownRepository.save(countdown_entity);
        countdown.setId(editedCountdown.id);
        return countdown;
    };

    async deleteCountdown(countdownId: number): Promise<void> {
        this.countdownRepository.delete(countdownId);
    };

    
};