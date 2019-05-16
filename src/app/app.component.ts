import {Component, OnInit} from '@angular/core';
import {YoutubeService} from './services/youtube.service';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  videos: any[] = [];

  constructor( public _yts: YoutubeService ) {
    this._yts.getVideos()
      .subscribe(videos => {
        console.log(videos);
        this.videos = videos;
      });
  }

  ngOnInit() {
    $(document).foundation();
  }
}
