import { Component, OnInit, OnDestroy } from '@angular/core';
import { VideoRecorder } from '@capacitor-community/video-recorder';
import { addIcons } from 'ionicons';
import { videocamOutline, stopCircleOutline, playCircleOutline, trashOutline, radioButtonOnOutline, chevronBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
  standalone: false
})
export class VideoPage implements OnInit, OnDestroy {
  isRecording = false;
  videoPath: string | undefined;

  constructor() {
    addIcons({ videocamOutline, stopCircleOutline, playCircleOutline, trashOutline, radioButtonOnOutline, chevronBackOutline });
  }

  ngOnInit() {
    this.initializeRecorder();
  }

  async initializeRecorder() {
    try {
      await VideoRecorder.initialize({
        camera: 'back',
        quality: '720p',
        stackPosition: 'back'
      });
    } catch (e) {
      console.error('Recorder init error', e);
    }
  }

  async startRecording() {
    try {
      await VideoRecorder.start();
      this.isRecording = true;
      // Pour voir l'aperçu derrière, on rend l'ion-content transparent via CSS
      document.body.classList.add('recorder-mode');
    } catch (e) {
      console.error('Start recording error', e);
    }
  }

  async stopRecording() {
    try {
      const result = await VideoRecorder.stop();
      this.isRecording = false;
      this.videoPath = result.videoUrl;
      document.body.classList.remove('recorder-mode');
    } catch (e) {
      console.error('Stop recording error', e);
    }
  }

  deleteVideo() {
    this.videoPath = undefined;
  }

  ngOnDestroy() {
    VideoRecorder.destroy();
    document.body.classList.remove('recorder-mode');
  }
}
