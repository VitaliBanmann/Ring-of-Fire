import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class Player implements OnInit {
  @Input() name: string = '';
  profileImagePosition: string = '0% 0%';

  ngOnInit() {
    this.profileImagePosition = this.getRandomProfileImage();
  }

  getRandomProfileImage(): string {
    const gridSize = 3;
    const randomIndex = Math.floor(Math.random() * 9);
    
    const row = Math.floor(randomIndex / gridSize);
    const col = randomIndex % gridSize;
    
    const xPositions = ['5%', '50%', '95%'];
    const yPositions = ['5%', '50%', '95%'];
    
    return `${xPositions[col]} ${yPositions[row]}`;
  }
}
