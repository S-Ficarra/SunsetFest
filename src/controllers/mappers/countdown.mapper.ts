import { Countdown } from "src/domain/models/countdown.model";
import { CountdownDto } from "../DTO/countdown.dto";



export function mapCountdownDtoToModelCreate (createCountdownDto: CountdownDto) {

    const startingTime = new Date(createCountdownDto.startingTime)
    const endingTime = new Date(createCountdownDto.endingTime)


    const countdown = new Countdown (
        createCountdownDto.name,
        startingTime,
        endingTime
    );

    return countdown;

};

export function mapCountdownDtoToModelEdit (countdownToEdit: Countdown, editCountdownDto: CountdownDto) {

    const startingTime = new Date(editCountdownDto.startingTime)
    const endingTime = new Date(editCountdownDto.endingTime)

    countdownToEdit.setName(editCountdownDto.name);
    countdownToEdit.setStartingDateAndTime(startingTime);
    countdownToEdit.setEndingDateAndTime(endingTime);

    return countdownToEdit;

};