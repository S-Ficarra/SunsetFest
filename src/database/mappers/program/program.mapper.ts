import { Program } from "src/domain/models/program/program.model";
import { programs } from "src/database/entities/programs.entity";
import { Performance } from "src/domain/models/program/performance/performance.model";
import { performances } from "src/database/entities/performances.entity";

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
