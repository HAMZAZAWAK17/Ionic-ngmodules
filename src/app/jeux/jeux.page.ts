import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import {
  gameControllerOutline,
  heart,
  trophyOutline,
  skullOutline,
  pulseOutline,
  keypadOutline,
  checkmarkCircleOutline,
  refreshCircleOutline,
  refreshOutline,
  chevronBackOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-jeux',
  templateUrl: './jeux.page.html',
  styleUrls: ['./jeux.page.scss'],
  standalone: false
})
export class JeuxPage implements OnInit {
  nombreSecret: number = 0;
  tentatives: number = 5;
  nombreSaisi: number | null = null;
  message: string = '';
  jeuTermine: boolean = false;
  gagne: boolean = false;

  constructor() {
    addIcons({
      gameControllerOutline,
      heart,
      trophyOutline,
      skullOutline,
      pulseOutline,
      keypadOutline,
      checkmarkCircleOutline,
      refreshCircleOutline,
      refreshOutline,
      chevronBackOutline
    });
  }

  ngOnInit() {
    this.initialiserJeu();
  }

  initialiserJeu() {
    this.nombreSecret = Math.floor(Math.random() * 101);
    this.tentatives = 5;
    this.nombreSaisi = null;
    this.message = 'Find the number between 0 and 100 !';
    this.jeuTermine = false;
    this.gagne = false;
  }

  verifierNombre() {
    if (this.jeuTermine || this.nombreSaisi === null) return;

    this.tentatives--;

    if (this.nombreSaisi > this.nombreSecret) {
      this.message = 'Too high! Try a lower number.';
    } else if (this.nombreSaisi < this.nombreSecret) {
      this.message = 'Too low! Try a higher number.';
    } else {
      this.message = 'Incredible! You found it!';
      this.jeuTermine = true;
      this.gagne = true;
      return;
    }

    if (this.tentatives <= 0 && !this.gagne) {
      this.message = `Game Over! The number was ${this.nombreSecret}.`;
      this.jeuTermine = true;
    }
    
    this.nombreSaisi = null;
  }

  recommencer() {
    this.initialiserJeu();
  }
}
