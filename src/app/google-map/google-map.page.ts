import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { addIcons } from 'ionicons';
import { searchOutline, pinOutline } from 'ionicons/icons';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.page.html',
  styleUrls: ['./google-map.page.scss'],
  standalone: false
})
export class GoogleMapPage implements OnInit {
  locationName: string = 'Casablanca';
  mapType: string = 'm';
  mapUrl: SafeResourceUrl = '';

  constructor(private sanitizer: DomSanitizer) {
    addIcons({ searchOutline, pinOutline });
  }

  ngOnInit() {
    this.updateMap();
  }

  updateMap() {
    if (!this.locationName) return;
    const gmapType = this.mapType === 'dark' ? 'm' : this.mapType;
    const url = `https://maps.google.com/maps?q=${encodeURIComponent(this.locationName)}&t=${gmapType}&z=13&ie=UTF8&iwloc=&output=embed`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
