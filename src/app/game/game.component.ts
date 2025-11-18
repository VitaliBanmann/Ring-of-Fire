import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Game } from '../../models/game';
import { Player } from '../player/player.component';
import { DialogAddPlayer } from '../dialog-add-player/dialog-add-player';
import { GameInfoComponent } from '../game-info/game-info.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    Player,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    GameInfoComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  pickCardAnimation = false;
  currentCard: string = '';
  game!: Game;
  readonly dialog = inject(MatDialog);

  constructor() {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
  }

  getVisibleStackCards(): number[] {
    const remainingCards = this.game.deck.length;
    
    let visibleCards = 0;
    
    if (remainingCards > 40) {
      visibleCards = 6;
    } else if (remainingCards > 10) {
      visibleCards = 5;
    } else if (remainingCards > 7) {
      visibleCards = 4;
    } else if (remainingCards > 5) {
      visibleCards = 3;
    } else if (remainingCards > 3) {
      visibleCards = 2;
    } else if (remainingCards > 0) {
      visibleCards = 1;
    } else {
      visibleCards = 0;
    }
    
    return Array(visibleCards).fill(0).map((_, i) => i);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayer);

    dialogRef.afterClosed().subscribe((result: { name: string, gender: 'male' | 'female' }) => {
      if (result && result.name) {
        const success = this.game.addPlayer(result.name, result.gender);
        if (!success) {
          alert(`Keine weiteren ${result.gender === 'male' ? 'männlichen' : 'weiblichen'} Avatare verfügbar!`);
        }
      }
    });
  }

  takeCard() {
    if (this.game.players.length === 0) {
      this.openDialog();
      return;
    }
    
    if (!this.pickCardAnimation && this.game.deck.length > 0) {
      this.currentCard = this.game.deck.pop() || '';
      this.pickCardAnimation = true;
      
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
        this.game.currentPlayerIndex++;
        this.game.currentPlayerIndex = this.game.currentPlayerIndex % this.game.players.length;
      }, 1000);
    }
  }
}