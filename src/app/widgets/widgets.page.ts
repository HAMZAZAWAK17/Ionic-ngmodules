import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { 
  statsChartOutline, 
  cashOutline, 
  peopleOutline, 
  analyticsOutline, 
  cartOutline,
  cellularOutline,
  pulseOutline,
  flashOutline,
  batteryChargingOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.page.html',
  styleUrls: ['./widgets.page.scss'],
  standalone: false
})
export class WidgetsPage implements OnInit {

  constructor() {
    addIcons({ 
      statsChartOutline, 
      cashOutline, 
      peopleOutline, 
      analyticsOutline, 
      cartOutline,
      cellularOutline,
      pulseOutline,
      flashOutline,
      batteryChargingOutline
    });
  }

  ngOnInit() { }
}
