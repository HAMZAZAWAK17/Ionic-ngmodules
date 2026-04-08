import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransferService } from '../services/data-transfer.service';
import { addIcons } from 'ionicons';
import { ToastController } from '@ionic/angular';
import { arrowBackOutline, swapHorizontalOutline, checkmarkCircleOutline } from 'ionicons/icons';

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
    private dataTransferService: DataTransferService,
    private toastController: ToastController
  ) { 
    addIcons({ arrowBackOutline, swapHorizontalOutline, checkmarkCircleOutline });
  }

  ngOnInit() {
    this.data = this.dataTransferService.getData();
    if (this.data) {
      this.nom = this.data.name || '';
    }
  }

  async valider() {
    // 1. On prépare l'objet avec les nouvelles données
    const updatedData = {
      name: this.nom,
      email: this.email,
      timestamp: new Date().toLocaleTimeString()
    };

    // 2. On utilise le service pour stockER ces données (Principe du transfert)
    this.dataTransferService.setData(updatedData);

    // 3. On affiche une confirmation visuelle (Toast)
    const toast = await this.toastController.create({
      message: 'Données transférées avec succès (Synchronisées) !',
      duration: 2000,
      color: 'success',
      position: 'top',
      icon: 'checkmark-circle-outline'
    });
    await toast.present();

    // 4. On retourne à l'accueil pour voir le résultat si nécessaire
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1500);
  }

  goHome() {
    this.router.navigate(['/home']);
  }

}
