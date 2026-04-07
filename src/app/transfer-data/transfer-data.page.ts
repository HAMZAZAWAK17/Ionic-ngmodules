import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransferService } from '../services/data-transfer.service';
import { addIcons } from 'ionicons';
import { arrowBackOutline, swapHorizontalOutline } from 'ionicons/icons';

@Component({
  selector: 'app-transfer-data',
  templateUrl: './transfer-data.page.html',
  styleUrls: ['./transfer-data.page.scss'],
  standalone: false
})
export class TransferDataPage implements OnInit {
  nom: string = '';
  email: string = '';
  data: any = null;

  constructor(
    private router: Router, 
    private dataTransferService: DataTransferService
  ) { 
    addIcons({ arrowBackOutline, swapHorizontalOutline });
  }

  ngOnInit() {
    this.data = this.dataTransferService.getData();
    if (this.data) {
      this.nom = this.data.name || '';
    }
  }

  valider() {
    console.log('Submission:', { nom: this.nom, email: this.email });
    // Process submission logic here
  }

  goHome() {
    this.router.navigate(['/home']);
  }

}
