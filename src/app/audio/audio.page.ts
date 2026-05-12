import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.page.html',
  styleUrls: ['./audio.page.scss'],
})
export class AudioPage implements OnInit, OnDestroy {
  mediaRecorder: MediaRecorder | null = null;
  audioChunks: Blob[] = [];
  audioUrl: string | null = null;
  audio: HTMLAudioElement | null = null;
  
  isRecording = false;
  isPlaying = false;
  recordingDuration = 0;
  timerInterval: any;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.stopTimer();
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }

  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        this.audioUrl = URL.createObjectURL(audioBlob);
        this.audio = new Audio(this.audioUrl);
        
        this.audio.onended = () => {
          this.isPlaying = false;
        };
      };

      this.mediaRecorder.start();
      this.isRecording = true;
      this.startTimer();
    } catch (err) {
      console.error('Could not start recording', err);
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;
      this.stopTimer();
    }
  }

  playAudio() {
    if (this.audio) {
      this.audio.play();
      this.isPlaying = true;
    }
  }

  pauseAudio() {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
    }
  }

  startTimer() {
    this.recordingDuration = 0;
    this.timerInterval = setInterval(() => {
      this.recordingDuration++;
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}
