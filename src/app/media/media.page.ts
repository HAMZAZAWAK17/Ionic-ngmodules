import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { videocamOutline, musicalNotesOutline, shareSocialOutline, filmOutline } from 'ionicons/icons';

@Component({
  selector: 'app-media',
  templateUrl: './media.page.html',
  styleUrls: ['./media.page.scss'],
  standalone: false
})
export class MediaPage implements OnInit {

  constructor() {
    addIcons({ videocamOutline, musicalNotesOutline, shareSocialOutline, filmOutline });
  }

  ngOnInit() {
  }

}
