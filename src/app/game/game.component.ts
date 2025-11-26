import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../../models/game';
import { Player } from '../player/player.component';
import { DialogAddPlayer } from '../dialog-add-player/dialog-add-player';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, collection, addDoc, doc, onSnapshot, setDoc } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { PlayerMobile } from '../player-mobile/player-mobile.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    Player,
    PlayerMobile,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    GameInfoComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit, OnDestroy {
  game!: Game;
  gameId: string = '';
  
  private firestore = inject(Firestore);
  private route = inject(ActivatedRoute);
  readonly dialog = inject(MatDialog);
  private gameSubscription: any;
  private routeSubscription!: Subscription;

  constructor() {
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(async params => {
      if (params['id']) {
        this.gameId = params['id'];
        this.subscribeToGame(this.gameId);
      } else {
        await this.newGame();
      }
    });
  }

  ngOnDestroy() {
    if (this.gameSubscription) {
      this.gameSubscription();
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  subscribeToGame(gameId: string) {
    const gameDoc = doc(this.firestore, 'games', gameId);
    
    this.gameSubscription = onSnapshot(gameDoc, (snapshot) => {
      if (snapshot.exists()) {
        const gameData = snapshot.data();
        this.game = new Game();
        Object.assign(this.game, gameData);
        this.game.currentCard = (gameData as any).currentCard || '';
        this.game.pickCardAnimation = (gameData as any).pickCardAnimation || false;
        console.log('Spiel aktualisiert:', this.game);
      }
    });
  }

  async newGame() {
    this.game = new Game();
    const gamesCollection = collection(this.firestore, 'games');
    const docRef = await addDoc(gamesCollection, this.game.toJson());
    this.gameId = docRef.id;
    console.log('Neues Spiel erstellt mit ID:', this.gameId);
    this.subscribeToGame(this.gameId);
  }

  async saveGame() {
    if (this.gameId) {
      const gameDoc = doc(this.firestore, 'games', this.gameId);
      await setDoc(gameDoc, this.game.toJson());
    }
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
        this.saveGame();
      }
    });
  }

  takeCard() {
    if (this.game.players.length === 0) {
      this.openDialog();
      return;
    }

    if (!this.game.pickCardAnimation && this.game.deck.length > 0) {
      this.game.currentCard = this.game.deck.pop() || '';
      this.game.pickCardAnimation = true;
      this.saveGame();

      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.game.currentPlayerIndex = (this.game.currentPlayerIndex + 1) % this.game.players.length;
        this.saveGame();
      }, 1000);
    }
  }
}