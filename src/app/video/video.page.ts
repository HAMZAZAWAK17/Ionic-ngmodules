import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { addIcons } from 'ionicons';
import { videocamOutline, stopCircleOutline, playCircleOutline, trashOutline, radioButtonOnOutline, chevronBackOutline } from 'ionicons/icons';
import { ToastController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
  standalone: false
})
export class VideoPage implements OnInit {
  isRecording: boolean = false;
  videoPath: string | undefined = undefined;

  constructor(
    private toastController: ToastController,
    private cd: ChangeDetectorRef
  ) {
    addIcons({ videocamOutline, stopCircleOutline, playCircleOutline, trashOutline, radioButtonOnOutline, chevronBackOutline });
  }

  ngOnInit() {}

  // Utilisation de l'API Native Capture (100% stable sur Android/iOS)
  handleVideoInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.videoPath = URL.createObjectURL(file);
      this.presentToast('Video captured successfully!', 'success');
      this.cd.detectChanges();
    }
  }

  triggerCamera() {
    const input = document.getElementById('video-capture-input') as HTMLInputElement;
    if (input) {
      input.click();
    }
  }

  deleteVideo() {
    this.videoPath = undefined;
    this.presentToast('Video deleted', 'medium');
  }

  private async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'bottom'
    });
    toast.present();
  }
}
