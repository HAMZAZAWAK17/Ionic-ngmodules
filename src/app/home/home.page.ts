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
  libraryOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  data = {
    msg: 'Bonjour',
    name: 'SDDI4'
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
      libraryOutline
    });
  }

  onTransferData() {
    this.dataTransferService.setData(this.data);
    this.router.navigate(['/transfer-data']);
  }

  goToDetails() {
    this.router.navigate(['/details']);
  }

  goToUI() {
    this.router.navigate(['/ui']);
  }

  goToJeux() {
    this.router.navigate(['/jeux']);
  }

  goToMedia() {
    this.router.navigate(['/media']);
  }

  goToComponents() {
    this.router.navigate(['/components-preview']);
  }

}
