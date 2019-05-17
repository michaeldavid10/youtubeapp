import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl: string = 'https://www.googleapis.com/youtube/v3';
  private apiKey: string = 'AIzaSyCZYVG12Rr9TfB0G-H7ZM_Qa7Hhv7xZGP8';
  private playlist: string = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken: string = '';

  constructor(
    public http: HttpClient
  ) { }

  getVideos() {
    let url = `${this.youtubeUrl}/playlistItems`;
    let params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '10')
      .set('playlistId', this.playlist)
      .set('key', this.apiKey);

    if (this.nextPageToken) {
      params = params.set('pageToken', this.nextPageToken);
    }

    return this.http.get(url, { params })
      .pipe(map(res => {
        console.log(res);
        this.nextPageToken = res['nextPageToken'];

        let videos: any[] = [];
        for (let video of res['items']) {
          let snippet = video.snippet;
          videos.push(snippet);
        }

        return videos;
      }));
  }
}
