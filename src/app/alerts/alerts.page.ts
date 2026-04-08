import { Component, OnInit } from '@angular/core';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  informationCircleOutline,
  alertTriangleOutline,
  documentTextOutline,
  listOutline,
  gridOutline,
  arrowForwardOutline,
  trashOutline,
  closeOutline,
  shareOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.page.html',
  styleUrls: ['./alerts.page.scss'],
  standalone: false
})
export class AlertsPage implements OnInit {

  constructor(
    private alertController: AlertController,
    private actionSheetController: ActionSheetController
  ) {
    addIcons({ 
      informationCircleOutline,
      warningOutline,
      documentTextOutline,
      listOutline,
      gridOutline,
      arrowForwardOutline,
      trashOutline,
      closeOutline,
      shareOutline
    });
  }

  ngOnInit() { }

  async presentSimpleAlert() {
    const alert = await this.alertController.create({
      header: 'Simple Alert',
      subHeader: 'Notification',
      message: 'Ceci est une alerte simple de type information.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentConfirmAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Voulez-vous vraiment supprimer cet élément ?',
      buttons: [
        { text: 'Annuler', role: 'cancel', cssClass: 'secondary' },
        { text: 'Supprimer', handler: () => console.log('Delete Confirmed') }
      ]
    });
    await alert.present();
  }

  async presentInputAlert() {
    const alert = await this.alertController.create({
      header: 'Formulaire Rapide',
      inputs: [
        { name: 'name', type: 'text', placeholder: 'Votre Nom' },
        { name: 'email', type: 'email', placeholder: 'Email' }
      ],
      buttons: [
        { text: 'Annuler', role: 'cancel' },
        { text: 'Envoyer', handler: (data) => console.log('Form data:', data) }
      ]
    });
    await alert.present();
  }

  async presentRadioAlert() {
    const alert = await this.alertController.create({
      header: 'Choix Multiple',
      inputs: [
        { type: 'radio', label: 'Option A', value: 'a', checked: true },
        { type: 'radio', label: 'Option B', value: 'b' },
        { type: 'radio', label: 'Option C', value: 'c' }
      ],
      buttons: ['Sélectionner']
    });
    await alert.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Options de Média',
      buttons: [
        { text: 'Supprimer', role: 'destructive', icon: 'trash-outline' },
        { text: 'Partager', icon: 'share-outline' },
        { text: 'Annuler', icon: 'close-outline', role: 'cancel' }
      ]
    });
    await actionSheet.present();
  }
}
