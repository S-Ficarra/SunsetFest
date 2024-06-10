import { Program } from "src/domain/models/program/program.model";
import { programs } from "src/database/entities/programs.entity";
import { Performance } from "src/domain/models/program/performance/performance.model";
import { performances } from "src/database/entities/performances.entity";

export function mapProgramToEntity (programId: number, performance: Performance): programs {
    const entity = new programs();
    entity.id = programId;
    entity.performance_ = performance.getId();
    return entity;
};


export function mapCreatedProgram (id: number): programs {
    const entity = new programs();
    entity.id = id
    return entity;
}
