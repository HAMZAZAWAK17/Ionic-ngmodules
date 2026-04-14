import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransferService } from '../services/data-transfer.service';
import { addIcons } from 'ionicons';
import { 
  informationCircleOutline, 
  phonePortraitOutline, 
  swapHorizontalOutline,
  navigateOutline,
  listOutline,
  gameControllerOutline,
  imagesOutline,
  libraryOutline,
  cloudyOutline,
  clipboardOutline,
  mapOutline,
  chevronForwardOutline,
  syncOutline,
  extensionPuzzleOutline,
  playCircleOutline,
  partlySunnyOutline,
  notificationsOutline,
  barChartOutline,
  chatbubblesOutline,
  callOutline,
  calculatorOutline,
  cloudDoneOutline,
  cameraOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  data: any = {
    msg: 'Bonjour',
    name: 'SDDI4',
    email: '',
    timestamp: ''
  };

  constructor(private router: Router, private dataTransferService: DataTransferService) {
    addIcons({ 
      informationCircleOutline, 
      phonePortraitOutline, 
      swapHorizontalOutline,
      navigateOutline,
      listOutline,
      gameControllerOutline,
      imagesOutline,
      libraryOutline,
      cloudyOutline,
      clipboardOutline,
      mapOutline,
      chevronForwardOutline,
      syncOutline,
      extensionPuzzleOutline,
      playCircleOutline,
      partlySunnyOutline,
      notificationsOutline,
      barChartOutline,
      chatbubblesOutline,
      callOutline,
      calculatorOutline,
      cloudDoneOutline,
      cameraOutline
    });
  }

  ionViewWillEnter() {
    // On récupère les données transférées pour les afficher sur l'accueil
    const savedData = this.dataTransferService.getData();
    if (savedData) {
      this.data.name = savedData.name || this.data.name;
      this.data.email = savedData.email || this.data.email;
      this.data.timestamp = savedData.timestamp || this.data.timestamp;
    }
  }

  onTransferData() {
    this.dataTransferService.setData(this.data);
    this.router.navigate(['/transfer-data']);
  }

  goToJeux() {
    this.router.navigate(['/jeux']);
  }

  goToMedia() {
    this.router.navigate(['/media']);
  }

  goToWeather() {
    this.router.navigate(['/weather']);
  }

  goToClipboard() {
    this.router.navigate(['/clipboard']);
  }

  goToGoogleMap() {
    this.router.navigate(['/google-map']);
  }

  goToAlerts() {
    this.router.navigate(['/alerts']);
  }

  goToWidgets() {
    this.router.navigate(['/widgets']);
  }

  goToSms() {
    this.router.navigate(['/sms']);
  }

  goToCall() {
    this.router.navigate(['/call']);
  }

  goToCalculator() {
    this.router.navigate(['/calculator']);
  }

  goToCamera() {
    this.router.navigate(['/camera']);
  }
}
