var templateGeneratorModule = (function () {
    return {
        playButtonTemplate: '<a class="album-song-button"><span class="ion-play"></span></a>',
        
        pauseButtonTemplate: '<a class="album-song-button"><span class="ion-pause"></span></a>',
        
        generateSongTemplate: function(song) {
            return '<tr class="album-view-song-item">'
                + ' <td class="song-item-number" id="song-item-'+song.songNumber+'" data-song-number="' + song.songNumber + '">' + song.songNumber + '</td>'
                + ' <td class="song-item-title">' + song.songName + '</td>'
                + ' <td class="song-item-duration">' + song.songLength + '</td>'
                + '</tr>'
            ;
        }
    }
}());