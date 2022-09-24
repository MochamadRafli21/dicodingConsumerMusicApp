const { Pool } = require('pg');

class PlaylistService {
    constructor(){
        this._pool = new Pool();
    }

    async getPlaylistSongs(playlist_id) {
        const query = {
          text: 'SELECT playlist_songs.*, playlist.name, songs.title, songs.performer FROM playlist_songs LEFT JOIN playlist ON playlist.id = playlist_songs.playlist_id LEFT JOIN songs ON songs.id = playlist_songs.songs_id WHERE playlist_songs.playlist_id = $1',
          values: [playlist_id]
        }
        const result = await this._pool.query(query)
    
        let playlist = result.rows.map(({
            id,
            name,
          }) => ({
            id,
            name,
          }))[0];
        let songs = result.rows.map(({ 
            id,
            title,
            performer,
          }) => ({
            id,
            title,
            performer,
          }));
        playlist["songs"] = songs;
        
        return {
          playlist: playlist
        };
    }
}

module.exports = PlaylistService;