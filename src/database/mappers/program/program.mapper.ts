import { Program } from "../../../domain/models/program/program.model";
import { programs } from "../../../database/entities/programs.entity";
import { performances } from "../../../database/entities/performances.entity";

export function mapProgramToEntity (program: Program, performance: performances): programs {
    const entity = new programs();

    entity.year = program.getId();
    entity.performance_ = performance;

    return entity;
};


export function mapCreatedProgram (year: number): programs {
    const entity = new programs();
    entity.year = year;
    return entity;
}
