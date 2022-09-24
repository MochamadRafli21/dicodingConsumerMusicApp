class Listener {
    constructor(playlistService, mailSender){
        this._playlistService = playlistService;
        this._mailSender = mailSender;

        this.listen = this.listen.bind(this);
    }

    async listen (message){
        try {
            const {playlistId, targetEmail} = JSON.parse(message.content.toString())

            const playlist = await this._playlistService.getPlaylistSongs(playlistId)
            const result = await this._mailSender.send_email(targetEmail, JSON.stringify(playlist))
            console.log(result)
            
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Listener;