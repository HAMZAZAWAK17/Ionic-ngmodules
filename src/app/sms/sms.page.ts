import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { paperPlaneOutline, phonePortraitOutline, chatbubblesOutline, documentTextOutline } from 'ionicons/icons';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.page.html',
  styleUrls: ['./sms.page.scss'],
  standalone: false
})
export class SmsPage implements OnInit {
  phoneNumber: string = '';
  messageText: string = '';

  constructor() {
    addIcons({ paperPlaneOutline, phonePortraitOutline, chatbubblesOutline, documentTextOutline });
  }

  ngOnInit() { }

  sendSms() {
    if (this.phoneNumber && this.messageText) {
      const smsUrl = `sms:${this.phoneNumber}?body=${encodeURIComponent(this.messageText)}`;
      window.open(smsUrl, '_system');
    }
  }
}
