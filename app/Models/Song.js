export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this._id = data.trackId || data._id;
  }

  get Template() {
    return `
    <div class="col-8">
    <div class="card cardWidth">
      <div class="card-body">
        <img
          src="${this.albumArt}"
          alt="Album Art"
          style="max-height: 100px; max-width: 100px;"
        />
        <h3 class="card-title">${this.artist}</h3>
        <h3 class="card-text">"${this.title}"</h3>
        <audio
        controls
        src="${this.preview}">
            Your browser does not support the
            <code>audio</code> element.
    </audio>
        <button
        type="button"
        class="btn btn-success"
        onclick="app.songsController.addSong({artist: '${this.artist}',album:'${this.album}',title: '${this.title}',_id:'${this._id}'})">Add Song</button>
      </div>
    </div>
  </div>
        `;
  }

  get playlistTemplate() {
    return `
    <div class="col-8">
    <div class="card cardWidth">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start">
      <img
          src="${this.albumArt}"
          alt="Album Art"
          style="max-height: 100px; max-width: 100px;"
        />
        <button type="button" class="bg-transparent border-0 redX" onclick="app.songsController.removeSong('${this._id}')">
    <span aria-hidden="true">&times;</span></button>
    </div>
        <h3 class="card-title">${this.artist}</h3>
        <h3 class="card-text">"${this.title}"</h3>
        <audio
        controls
        src="${this.preview}">
            Your browser does not support the
            <code>audio</code> element.
    </audio>
      </div>
    </div>
  </div>
        `;
  }
}
