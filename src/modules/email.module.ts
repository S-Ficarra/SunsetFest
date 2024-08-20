import { Module } from "@nestjs/common";
import { EmailService } from "src/services/email.service";
import { EmailController } from "src/controllers/controllers/email.controller";


@Module({
    providers: [
        EmailService,
        {
            provide: 'EmailService',
            useClass: EmailService,
        }
    ],
    controllers: [EmailController],
})
export class EmailModule {}