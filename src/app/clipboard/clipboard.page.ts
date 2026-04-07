import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { copyOutline, clipboardOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-clipboard',
  templateUrl: './clipboard.page.html',
  styleUrls: ['./clipboard.page.scss'],
  standalone: false
})
export class ClipboardPage implements OnInit {
  clipboardText: string = '';
  message: string = '';

  constructor() {
    addIcons({ copyOutline, clipboardOutline, trashOutline });
  }

  ngOnInit() { }

  async copyToClipboard() {
    if (this.clipboardText) {
      try {
        await navigator.clipboard.writeText(this.clipboardText);
        this.showMessage('✅ Text copied to system clipboard!');
      } catch (err) {
        this.showMessage('❌ Failed to copy. Check permissions.');
      }
    }
  }

  async pasteFromClipboard() {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        this.clipboardText = text;
        this.showMessage('📋 Text pasted successfully!');
      } else {
        this.showMessage('⚠️ Clipboard is empty.');
      }
    } catch (err) {
      this.showMessage('🚫 Error: Permission denied to read clipboard.');
      console.error('Clipboard paste error:', err);
    }
  }

  clearText() {
    this.clipboardText = '';
    this.showMessage('Text cleared.');
  }

  private showMessage(msg: string) {
    this.message = msg;
    setTimeout(() => this.message = '', 3000);
  }
}
