import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
  standalone: false
})
export class CalculatorPage {
  // Variables pour stocker les nombres et le résultat
  n1: number = 0;
  n2: number = 0;
  result: number | string = 0;

  constructor() {}

  // Fonctions pour les opérations
  add() {
    this.result = this.n1 + this.n2;
  }

  subtract() {
    this.result = this.n1 - this.n2;
  }

  multiply() {
    this.result = this.n1 * this.n2;
  }

  divide() {
    if (this.n2 !== 0) {
      this.result = this.n1 / this.n2;
    } else {
      this.result = "Erreur (Div par 0)";
    }
  }

  clear() {
    this.n1 = 0;
    this.n2 = 0;
    this.result = 0;
  }
}
