var templateGeneratorModule = (function () {
    return {
        playButtonTemplate: '<a class="album-song-button"><span class="ion-play"></span></a>',
        
        pauseButtonTemplate: '<a class="album-song-button"><span class="ion-pause"></span></a>',
        
        playerBarPlayButton: '<span class="ion-play"></span>',
        
        playerBarPauseButton: '<span class="ion-pause></span>',
        
        generateSongTemplate: function(song) {
            return '<tr class="album-view-song-item">'
                + ' <td class="song-item-number" id="song-item-'+song.songNumber+'" data-song-number="' + song.songNumber + '">' + song.songNumber + '</td>'
                + ' <td class="song-item-title">' + song.songName + '</td>'
                + ' <td class="song-item-duration">' + song.songLength + '</td>'
                + '</tr>'
            ;
        },
        
        // album.html <div class="control-group currently-playing">
        generatePlayerBarSong: function(artist, song) {
            return '<h2 class="song-name">' + song.name + '</h2>'
                + '<div class="seek-control">'
                +       '<div class="seek-bar">'
                +           '<div class="fill"></div>'
                +           '<div class="thumb"></div>'
                +       '</div>'
                +       '<div class="current-time">2:30</div>'
                +       '<div class="total-time">4:45</div>'
                +       '</div>'
                +   '<h2 class="artist-song-mobile">' + song.name + '' + artist + '</h2>'
                +   '<h3 class="artist-name">' + artist + '</h3>'
        }
    }
}());