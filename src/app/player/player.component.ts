import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class Player {
  @Input() name: string = '';
  @Input() avatar: string = '0% 0%';
  @Input('playerActiv') playerActive: boolean = false;
}
