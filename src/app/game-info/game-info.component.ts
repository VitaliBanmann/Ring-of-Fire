import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit, OnChanges {
  cardAction = [
    { title: 'Wasserfall', description: 'Wenn du diese Karte ziehst, musst du einen Schluck aus deinem Becher trinken und die anderen Spieler im Uhrzeigersinn nacheinander ebenfalls.' },
    { title: 'Du darfst bestimmen', description: 'Du darfst bestimmen, welcher Spieler etwas trinken bzw. seinen Becher leer trinken muss.' },
    { title: 'Du musst trinken', description: 'Du musst selbst trinken.' },
    { title: 'Alle Frauen trinken', description: 'Alle weiblichen Mitspieler müssen trinken.' },
    { title: 'Daumenmeister', description: 'Du wirst zum Daumenmeister und musst deinen Daumen auf den Tisch bzw. die Spielfläche legen. Auch alle anderen Spieler müssen dies tun und wer zuletzt reagiert, muss trinken.' },
    { title: 'Alle Männer trinken', description: 'Alle männlichen Mitspieler müssen trinken.' },
    { title: 'Frau Lehrerin', description: 'Du musst dich wie in der Schule melden. Auch deine Mitspieler müssen das und wer als letztes reagiert, muss trinken.' },
    { title: 'Trinkpartner', description: 'Du musst einen Mitspieler des anderen Geschlechts aussuchen, der immer gemeinsam mit dir trinken muss.' },
    { title: 'Reimwort', description: 'Du sagst ein alltägliches Wort und im Uhrzeigersinn muss jeder Mitspieler ein sich darauf reimendes Wort sagen. Wer zu lange braucht oder keins findet, muss trinken.' },
    { title: 'Kategorie', description: 'Nenne eine Marke (z.B. Automarke) und der Reihenfolge nach muss jeder Mitspieler ebenfalls eine Marke aus der gleichen Kategorie nennen. Wer zu lange braucht oder das nicht schafft, muss trinken.' },
    { title: 'Neue Regel', description: 'Hast du diese Karte gezogen, darfst du dir eine neue Regel ausdenken, wann, ob, wie oder wie viel getrunken werden muss. Wer die Regel nicht befolgt – muss trinken. Diese kommt dann zu den bereits vorhandenen Ring of Fire Regeln hinzu.' },
    { title: 'Stille Post', description: 'Mit dir darf niemand reden, bis jemand anderes eine Dame gezogen hat. Wer doch mit dir redet, muss trinken.' },
    { title: 'König', description: 'Wenn du diese Karte gezogen hast, schüttest du deinen Becherinhalt in das Glas in der Mitte. Wer den letzten im Spiel befindlichen König zieht, muss dieses Glas austrinken. Prost!' },
  ];

  title = '';
  description = '';
  @Input() card: string = '';
  @Input() currentPlayerName: string | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.card) {
      console.log('Current card is:', this.card);
      let cardNumber = this.getCardNumber(this.card);
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }

  getCardNumber(card: string): number {
    const cardValue = card.split('_')[0];
    
    // Mapping von Kartenwerten zu Zahlen (1-13)
    const valueMap: { [key: string]: number } = {
      'ace': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
      '8': 8,
      '9': 9,
      '10': 10,
      'jack': 11,
      'queen': 12,
      'king': 13
    };
    
    return valueMap[cardValue] || 1;
  }
}