import { Component, OnInit, OnDestroy } from '@angular/core';
import { BarcodeScanner, BarcodeFormat, LensFacing, BarcodesScannedEvent } from '@capacitor-mlkit/barcode-scanning';
import { AlertController, Platform } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { qrCodeOutline, flashOutline, flashOffOutline, closeOutline, refreshOutline } from 'ionicons/icons';
import { PluginListenerHandle } from '@capacitor/core';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
  standalone: false,
})
export class QrScannerPage implements OnInit, OnDestroy {
  isScanning = false;
  scannedResult: string | null = null;
  isTorchOn = false;
  scanListener: PluginListenerHandle | null = null;

  constructor(
    private alertController: AlertController,
    private platform: Platform
  ) {
    addIcons({ qrCodeOutline, flashOutline, flashOffOutline, closeOutline, refreshOutline });
  }

  async ngOnInit() {
    if (this.platform.is('capacitor')) {
      await BarcodeScanner.installGoogleBarcodeScannerModule();
    }
  }

  ngOnDestroy() {
    this.stopScan();
  }

  async startScan() {
    try {
      const granted = await this.requestPermissions();
      if (!granted) {
        this.presentAlert('Permission refusée', 'L\'accès à la caméra est nécessaire pour scanner des codes QR.');
        return;
      }

      this.isScanning = true;
      this.scannedResult = null;
      
      // Remove any existing listeners
      if (this.scanListener) {
        await this.scanListener.remove();
      }

      // Add listener BEFORE starting scan
      this.scanListener = await BarcodeScanner.addListener('barcodesScanned', (event: BarcodesScannedEvent) => {
        if (event.barcodes.length > 0) {
          this.scannedResult = event.barcodes[0].displayValue;
          this.stopScan();
        }
      });

      // Make background transparent for camera view
      document.querySelector('body')?.classList.add('barcode-scanner-active');

      await BarcodeScanner.startScan({
        formats: [BarcodeFormat.QrCode],
        lensFacing: LensFacing.Back
      });

    } catch (err) {
      console.error(err);
      this.stopScan();
    }
  }

  async stopScan() {
    this.isScanning = false;
    document.querySelector('body')?.classList.remove('barcode-scanner-active');
    
    if (this.scanListener) {
      await this.scanListener.remove();
      this.scanListener = null;
    }
    
    await BarcodeScanner.stopScan();
  }

  async toggleTorch() {
    this.isTorchOn = !this.isTorchOn;
    await BarcodeScanner.toggleTorch();
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  reset() {
    this.scannedResult = null;
  }
}
