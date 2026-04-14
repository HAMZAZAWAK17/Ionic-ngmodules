import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { addIcons } from 'ionicons';
import { cameraOutline, trashOutline, imageOutline, apertureOutline, chevronBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
  standalone: false
})
export class CameraPage implements OnInit {
  capturedImage: string | undefined;

  constructor() {
    addIcons({ cameraOutline, trashOutline, imageOutline, apertureOutline, chevronBackOutline });
  }

  ngOnInit() {}

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });

      this.capturedImage = image.dataUrl;
    } catch (error) {
      console.error('Camera error:', error);
    }
  }

  async selectFromGallery() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      });

      this.capturedImage = image.dataUrl;
    } catch (error) {
      console.error('Gallery error:', error);
    }
  }

  deletePicture() {
    this.capturedImage = undefined;
  }
}
