import { countdowns } from "../../database/entities/countdowns.entity";
import { Countdown } from "../../domain/models/countdown.model";

export function mapCountdownModeltoEntity(model: Countdown): countdowns {

    const entity = new countdowns();
    entity.name = model.getName();
    entity.ending_time = model.getEndingDateAndTime();
    return entity;

};

export function mapCountdownModeltoEntityEdit(model: Countdown): countdowns {

    const entity = new countdowns();
    entity.id = model.getId()
    entity.name = model.getName();
    entity.ending_time = model.getEndingDateAndTime();
    return entity;

};


export function mapCountdownEntitytoModel (entity: countdowns): Countdown {

    const countdown = new Countdown (
        entity.name,
        entity.ending_time
    );
    countdown.setId(entity.id);
    return countdown;

};