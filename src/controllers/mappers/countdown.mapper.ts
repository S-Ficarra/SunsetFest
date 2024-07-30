import { Countdown } from "../../domain/models/countdown.model";
import { CountdownDto } from "../DTO/countdown.dto";



export function mapCountdownDtoToModelCreate (createCountdownDto: CountdownDto) {

    const endingTime = new Date(createCountdownDto.endingTime)

    const countdown = new Countdown (
        createCountdownDto.name,
        endingTime
    );

    return countdown;

};

export function mapCountdownDtoToModelEdit (countdownToEdit: Countdown, editCountdownDto: CountdownDto) {

    const endingTime = new Date(editCountdownDto.endingTime)

    countdownToEdit.setName(editCountdownDto.name);
    countdownToEdit.setEndingDateAndTime(endingTime);

    return countdownToEdit;

};