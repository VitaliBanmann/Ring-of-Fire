import { Component, inject } from '@angular/core';
import { Router } from "@angular/router";
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Component({
  selector: 'app-startscreen',
  standalone: true,
  imports: [],
  templateUrl: './startscreen.component.html',
  styleUrl: './startscreen.component.scss',
})
export class StartscreenComponent {
  private firestore = inject(Firestore);
  private router = inject(Router);

  async newGame() {
    let game = new Game();
    const gamesCollection = collection(this.firestore, 'games');
    const docRef = await addDoc(gamesCollection, game.toJson());
    this.router.navigateByUrl('/Game/' + docRef.id);
  }
}
