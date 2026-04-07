import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { 
  addOutline, 
  shareOutline, 
  starOutline, 
  heartOutline, 
  searchOutline, 
  personOutline, 
  settingsOutline,
  notificationsOutline,
  mailOutline,
  callOutline,
  airplaneOutline,
  bluetoothOutline,
  wifiOutline,
  moonOutline,
  sunnyOutline,
  flaskOutline,
  chevronDownOutline,
  homeOutline,
  trashOutline,
  refreshOutline,
  reorderThreeOutline
} from 'ionicons/icons';
import { ModalController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.page.html',
  styleUrls: ['./widgets.page.scss'],
  standalone: false
})
export class WidgetsPage implements OnInit {
  progressValue = 0.5;
  rangeValue = 50;
  toggleStatus = true;
  checkboxStatus = false;
  selectedSegment = 'all';
  isModalOpen = false;

  constructor(
    private modalController: ModalController,
    private popoverController: PopoverController
  ) {
    addIcons({ 
      addOutline, 
      shareOutline, 
      starOutline, 
      heartOutline, 
      searchOutline, 
      personOutline, 
      settingsOutline,
      notificationsOutline,
      mailOutline,
      callOutline,
      airplaneOutline,
      bluetoothOutline,
      wifiOutline,
      moonOutline,
      sunnyOutline,
      flaskOutline,
      chevronDownOutline,
      homeOutline,
      trashOutline,
      refreshOutline,
      reorderThreeOutline
    });
  }

  ngOnInit() { }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
