import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PersonaController } from "./persona/persona.controller";
import { PersonaService } from './persona/persona.service';

@Module({
    imports: [],
    controllers: [AppController, PersonaController],
    providers: [AppService, PersonaService],
})
export class AppModule {}
