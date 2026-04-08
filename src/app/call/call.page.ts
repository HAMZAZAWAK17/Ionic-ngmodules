import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { callOutline } from 'ionicons/icons';

@Component({
  selector: 'app-call',
  templateUrl: './call.page.html',
  styleUrls: ['./call.page.scss'],
  standalone: false
})
export class CallPage implements OnInit {
  phoneNumber: string = '';

  constructor() {
    addIcons({ callOutline });
  }

  ngOnInit() { }

  makeCall() {
    if (this.phoneNumber) {
      window.open(`tel:${this.phoneNumber}`, '_system');
    }
  }

}
