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
  currentVideo: any;

  constructor( public _yts: YoutubeService ) {
    this._yts.getVideos()
      .subscribe(videos => {
        this.videos = videos;
      });
  }

  ngOnInit() {
    $(document).foundation();
  }

  showVideo(video: any) {
    this.currentVideo = video;
    $('#exampleModal1').foundation('open');
  }

  closeVideo() {
    this.currentVideo = null;
    $('#exampleModal1').foundation('close');
  }

  loadMore() {
    this._yts.getVideos()
      .subscribe(videos => {
        this.videos.push.apply(this.videos, videos);
      });
  }
}
