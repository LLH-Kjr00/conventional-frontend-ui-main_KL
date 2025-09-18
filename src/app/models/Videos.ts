export class Videos {
    playlist: number[];
    readyToPlay: boolean;
    currentVideoIndex: number | undefined;
    currentVideoId: number | undefined;

    constructor(playlist: number[]) {
        this.playlist = playlist;
        this.readyToPlay = false;
    }

}
