import { Component, OnInit, OnDestroy } from '@angular/core';
import { VideoRecorder } from '@capacitor-community/video-recorder';
import { addIcons } from 'ionicons';
import { videocamOutline, stopCircleOutline, playCircleOutline, trashOutline, radioButtonOnOutline, chevronBackOutline } from 'ionicons/icons';
import { ToastController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
  standalone: false
})
export class VideoPage implements OnInit, OnDestroy {
  isRecording: boolean = false;
  videoPath: string | undefined = undefined;

  constructor(
    private toastController: ToastController,
    private platform: Platform
  ) {
    addIcons({ videocamOutline, stopCircleOutline, playCircleOutline, trashOutline, radioButtonOnOutline, chevronBackOutline });
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.initializeRecorder();
    });
  }

  async initializeRecorder() {
    try {
      // Demande explicite des permissions avant initialisation
      const permissions = await (VideoRecorder as any).requestPermissions();
      if (permissions.camera !== 'granted' || permissions.microphone !== 'granted') {
          this.presentToast('Permissions denied: ' + JSON.stringify(permissions), 'warning');
          return;
      }

      await (VideoRecorder as any).initialize({
        camera: 'back',
        quality: '720p',
        stackPosition: 'back'
      });
      console.log('Recorder initialized');
    } catch (e) {
      this.presentToast('Recorder init failed: ' + JSON.stringify(e), 'danger');
    }
  }

  async startRecording() {
    try {
      await (VideoRecorder as any).start();
      this.isRecording = true;
      document.body.classList.add('recorder-mode');
      this.presentToast('Recording started...', 'danger');
    } catch (e) {
      this.presentToast('Failed to start: ' + JSON.stringify(e), 'danger');
    }
  }

  async stopRecording() {
    try {
      const result: any = await (VideoRecorder as any).stop();
      this.isRecording = false;
      this.videoPath = result?.videoUrl;
      document.body.classList.remove('recorder-mode');
      this.presentToast('Recording saved!', 'success');
    } catch (e) {
      this.presentToast('Failed to stop: ' + JSON.stringify(e), 'danger');
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

  ngOnDestroy() {
    try {
      (VideoRecorder as any).destroy();
    } catch (e) {}
    document.body.classList.remove('recorder-mode');
  }
}
