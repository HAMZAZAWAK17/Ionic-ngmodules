import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@capacitor/clipboard';
import { addIcons } from 'ionicons';
import { 
  copyOutline, 
  clipboardOutline, 
  trashOutline, 
  duplicateOutline, 
  readerOutline,
  chevronBackOutline,
  sparklesOutline
} from 'ionicons/icons';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-clipboard',
  templateUrl: './clipboard.page.html',
  styleUrls: ['./clipboard.page.scss'],
  standalone: false
})
export class ClipboardPage implements OnInit {
  textToCopy: string = '';
  textFromClipboard: string = '';

  constructor(private toastController: ToastController) {
    addIcons({ 
      copyOutline, 
      clipboardOutline, 
      trashOutline, 
      duplicateOutline, 
      readerOutline,
      chevronBackOutline,
      sparklesOutline
    });
  }

  ngOnInit() { }

  async copyToClipboard() {
    if (this.textToCopy) {
      try {
        await Clipboard.write({
          string: this.textToCopy
        });
        this.presentToast('✅ Copied to clipboard!', 'success');
      } catch (err) {
        this.presentToast('❌ Copy failed.', 'danger');
        console.error('Clipboard copy error:', err);
      }
    }
  }

  async pasteFromClipboard() {
    try {
      const { type, value } = await Clipboard.read();
      if (value) {
        this.textFromClipboard = value;
        this.presentToast('📋 Pasted successfully!', 'primary');
      } else {
        this.presentToast('⚠️ Clipboard is empty.', 'warning');
      }
    } catch (err) {
      this.presentToast('🚫 Permission denied.', 'danger');
      console.error('Clipboard paste error:', err);
    }
  }

  clearAll() {
    this.textToCopy = '';
    this.textFromClipboard = '';
    this.presentToast('Fields cleared.', 'medium');
  }

  private async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom',
      mode: 'ios',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }
}
