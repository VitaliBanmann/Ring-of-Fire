import { Routes } from '@angular/router';
import { StartscreenComponent } from "./startscreen/startscreen.component";
import { GameComponent } from './game/game.component';
import { MatCardModule } from '@angular/material/card';

export const routes: Routes = [
    { path: '', component: StartscreenComponent },
    { path: 'Game', component: GameComponent }
];