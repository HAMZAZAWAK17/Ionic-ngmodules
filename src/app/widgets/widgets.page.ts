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
  flaskOutline
} from 'ionicons/icons';

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

  constructor() {
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
      flaskOutline
    });
  }

  ngOnInit() { }
}
