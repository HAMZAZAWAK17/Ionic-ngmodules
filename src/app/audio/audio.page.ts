import { Component, OnInit, OnDestroy } from '@angular/core';
import { addIcons } from 'ionicons';
import { 
  micOutline, 
  musicalNotesOutline, 
  radioButtonOn, 
  stop, 
  play, 
  pause, 
  refresh 
} from 'ionicons/icons';
import { VoiceRecorder, GenericResponse } from 'capacitor-voice-recorder';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.page.html',
  styleUrls: ['./audio.page.scss'],
  standalone: false,
})
export class AudioPage implements OnInit, OnDestroy {
  audioUrl: string | null = null;
  audio: HTMLAudioElement | null = null;
  
  isRecording = false;
  isPlaying = false;
  recordingDuration = 0;
  timerInterval: any;

  constructor() { 
    addIcons({ 
      micOutline, 
      musicalNotesOutline, 
      radioButtonOn, 
      stop, 
      play, 
      pause, 
      refresh 
    });
  }

  async ngOnInit() {
    // Demander les permissions au chargement
    await VoiceRecorder.requestAudioRecordingPermission();
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
      const canRecord = await VoiceRecorder.canDeviceVoiceRecord();
      if (!canRecord.value) {
        alert("Cet appareil ne supporte pas l'enregistrement audio.");
        return;
      }

      const permission = await VoiceRecorder.hasAudioRecordingPermission();
      if (!permission.value) {
        const request = await VoiceRecorder.requestAudioRecordingPermission();
        if (!request.value) {
          alert("Permission microphone refusée.");
          return;
        }
      }

      await VoiceRecorder.startRecording();
      this.isRecording = true;
      this.startTimer();
      this.audioUrl = null;
    } catch (err) {
      console.error('Could not start recording', err);
      alert("Erreur lors de l'accès au micro : " + JSON.stringify(err));
    }
  }

  async stopRecording() {
    try {
      const result = await VoiceRecorder.stopRecording();
      this.isRecording = false;
      this.stopTimer();

      if (result.value && result.value.recordDataBase64) {
        const base64Sound = result.value.recordDataBase64;
        const mimeType = result.value.mimeType;
        this.audioUrl = `data:${mimeType};base64,${base64Sound}`;
        this.audio = new Audio(this.audioUrl);
        
        this.audio.onended = () => {
          this.isPlaying = false;
        };
      }
    } catch (err) {
      console.error('Could not stop recording', err);
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
