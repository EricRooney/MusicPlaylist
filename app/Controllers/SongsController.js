import store from "../store.js";
import SongService from "../Services/SongsService.js";

//Private
/**Draws the Search results to the page */
function _drawResults() {
  let template = "";
  let songs = store.State.songs;
  songs.forEach(song => (template += song.Template));
  document.querySelector("#songResults").innerHTML = template;
}
/**Draws the Users saved songs to the page */
function _drawPlaylist() {
  let template = "";
  let songs = store.State.playlist;
  songs.forEach(song => (template += song.playlistTemplate));
  document.querySelector("#playlist").innerHTML = template;
}

//Public
export default class SongsController {
  constructor() {
    console.log("Made it to controller");
    store.subscribe("songs", _drawResults);
    store.subscribe("playlist", _drawPlaylist);
    //TODO Don't forget to register your subscribers
  }

  /**Takes in the form submission event and sends the query to the service */
  search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    try {
      SongService.getMusicByQuery(e.target.query.value);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {{artist, title, album}} songData
   */
  addSong(songData) {
    SongService.addSong(songData);
  }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  removeSong(id) {
    SongService.removeSong(id);
  }
}
