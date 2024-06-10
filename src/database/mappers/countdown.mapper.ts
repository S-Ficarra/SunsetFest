import { countdowns } from "src/database/entities/countdowns.entity";
import { Countdown } from "src/domain/models/countdown.model";

export function mapCountdownModeltoEntity(model: Countdown): countdowns {

    const entity = new countdowns();
    entity.name = model.getName();
    entity.starting_time = model.getStartingDateAndTime();
    entity.ending_time = model.getEndingDateAndTime();
    return entity;

};


export function mapCountdownEntitytoModel (entity: countdowns): Countdown {

    const countdown = new Countdown (
        entity.name,
        entity.starting_time,
        entity.ending_time
    );
    countdown.setId(entity.id);
    return countdown;

};