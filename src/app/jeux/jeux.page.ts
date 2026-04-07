import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    this.initialiserJeu();
  }

  initialiserJeu() {
    this.nombreSecret = Math.floor(Math.random() * 101);
    this.tentatives = 5;
    this.nombreSaisi = null;
    this.message = 'Saisissez un nombre entre 0 et 100 !';
    this.jeuTermine = false;
    this.gagne = false;
  }

  verifierNombre() {
    if (this.jeuTermine || this.nombreSaisi === null) return;

    this.tentatives--;

    if (this.nombreSaisi > this.nombreSecret) {
      this.message = 'Trop grand ! Essayez plus bas.';
    } else if (this.nombreSaisi < this.nombreSecret) {
      this.message = 'Trop petit ! Essayez plus haut.';
    } else {
      this.message = 'Bravo ! Vous avez trouvé !';
      this.jeuTermine = true;
      this.gagne = true;
      return;
    }

    if (this.tentatives <= 0 && !this.gagne) {
      this.message = `Perdu ! Le nombre était ${this.nombreSecret}.`;
      this.jeuTermine = true;
    }
    
    this.nombreSaisi = null;
  }

  recommencer() {
    this.initialiserJeu();
  }
}
