import Song from "../Models/Song.js";
import store from "../store.js";

// @ts-ignore
let _sandBox = axios.create({
  //TODO Change YOURNAME to your actual name
  baseURL: "//bcw-sandbox.herokuapp.com/api/DoubleDogDare/songs"
});

class SongsService {
  constructor() {
    // NOTE this will get your songs on page load
    this.getMySongs();
    store.subscribe("songs", () => {});
  }

  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  getMusicByQuery(query) {
    //NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?callback=?&term=" + query;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        console.log(res);
        let results = res.results.map(rawData => new Song(rawData));
        store.commit("songs", results);
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  /**
   * Retrieves the saved list of songs from the sandbox
   */
  getMySongs() {
    _sandBox
      .get()
      .then(res => {
        console.log(res);

        //TODO What are you going to do with this result
        let results = res.data.data.map(rawData => new Song(rawData));
        store.commit("playlist", results);
      })
      .catch(error => {
        throw new Error(error);
      });
  }

  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info
   * @param {{artist, title, album}} songData
   */
  addSong(songData) {
    //TODO you only have an id, you will need to find it in the store before you can post it
    //TODO After posting it what should you do?
    let foundSong = store.State.songs.find(
      song =>
        songData.title === song.title &&
        songData.artist === song.artist &&
        songData.album === song.album
    );
    console.log(foundSong);

    let found = false;
    store.State.playlist.forEach(song => {
      if (
        foundSong.title === song.title &&
        foundSong.artist === song.artist &&
        foundSong.album === song.album
      ) {
        found = true;
      }
    });
    if (found === false) {
      _sandBox
        .post("", foundSong)
        .then(this.getMySongs)
        .catch(err => {
          console.error(err);
        });
    }
  }

  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  removeSong(id) {
    //TODO Send the id to be deleted from the server then update the store
    _sandBox
      .delete(id)
      .then(this.getMySongs)
      .catch(err => {
        console.error(err);
      });
  }
}

const service = new SongsService();
export default service;
