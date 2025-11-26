import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-mobile',
  standalone: true,
  imports: [],
  templateUrl: './player-mobile.component.html',
  styleUrls: ['./player-mobile.component.scss'],
})
export class PlayerMobile {
  @Input() name: string = '';
  @Input() avatar: string = '0% 0%';
  @Input('playerActiv') playerActive: boolean = false;
}