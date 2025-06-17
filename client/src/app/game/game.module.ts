import { NgModule } from "@angular/core";
import { GameComponent } from "./component/game.component";
import { GameService } from "./services/game.service";
import { StoreModule } from "@ngrx/store";
import { gameReducer } from "./reducers/game.reducer";
import { GameEffects } from "./effects/game.effects";
import { EffectsModule } from "@ngrx/effects";
import { GraphQLModule } from "../graphql/graphql.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations:[GameComponent],
    providers:[GameService],
    imports:[  
        FormsModule,
        CommonModule,
        GraphQLModule,
        StoreModule.forRoot({ game: gameReducer }),
    EffectsModule.forRoot([GameEffects]),],
    exports:[GameComponent]
})
export class GameModule{}