import {AppController} from './AppController';
import {Videos} from '../models/Videos';

export class VideoController {
    app: AppController;
    videos: Videos = new Videos([]);
    constructor(app: AppController) {
      this.app = app;
    }
    loadPlaylistVideo() {
      if (this.videos.playlist.length > 0) {
        this.videos.currentVideoIndex !== undefined ? this.videos.currentVideoIndex += 1 : this.videos.currentVideoIndex = 0;
        this.videos.currentVideoId = this.videos.playlist[this.videos.currentVideoIndex] !== undefined
            ? this.videos.playlist[this.videos.currentVideoIndex] : this.videos.playlist[this.videos.currentVideoIndex = 0];
      }
    }
    setReadyToPlay(readyToPlay: boolean) {
      this.videos.readyToPlay = readyToPlay;
    }
    setVideos(newPlaylist: number[]) {
      let different = false;
      if (newPlaylist.length) { this.setReadyToPlay(true); }
      for ( const video of newPlaylist ) {
        if (!this.videos.playlist.includes(video)) {
          different = true;
          break;
        }
      }
      if (different) {
        this.videos.playlist = newPlaylist;
        this.loadPlaylistVideo();
      }
    }
}
