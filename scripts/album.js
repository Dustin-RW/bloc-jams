var allAlbums = [albumPicasso, albumMarconi, albumForeigner];

var templates = templateGeneratorModule;

//Templates
var playButtonTemplate = templates.playButtonTemplate;
var pauseButtonTemplate = templates.pauseButtonTemplate;
var playerBarPlayButton = templates.playerBarPlayButton;
var playerBarPauseButton = templates.playerBarPauseButton;

var clickHandler = function(event) {
    var songItem = $(this);
    var songNum = songItem.attr('data-song-number');


    if (currentlyPlayingSongNumber === null) {
      songItem.html(pauseButtonTemplate);
      currentlyPlayingSongNumber = songNum;

    } else if (currentlyPlayingSongNumber === songNum) {
      songItem.html(playButtonTemplate);
      currentlyPlayingSongNumber = null;

    } else if (currentlyPlayingSongNumber!== songNum) {
      var currentlyPlayingSongElement = $('[data-song-number="' + currentlyPlayingSongNumber + '"]');
      currentlyPlayingSongElement.html(currentlyPlayingSongElement.attr('data-song-number'));
      songItem.html(pauseButtonTemplate);
      currentlyPlayingSongNumber = songNum;
    }
};

 var onHover = function(event) {
    var $songNumberItem = $(this).find('td.song-item-number');
    var $songNum = $songNumberItem.attr('data-song-number');


    if ($songNum !== currentlyPlayingSongNumber) {
        $songNumberItem.html(playButtonTemplate);
    }

};

var offHover = function(event) {
    var $songNumberItem = $(this).find('td.song-item-number');
    var $songNum = $songNumberItem.attr('data-song-number');

    if ($songNum !== currentlyPlayingSongNumber) {
        $songNumberItem.html($songNum);
    }

};

var createSongRow = function(songNumber, songName, songLength) {
    
    //set row to the jquery template
    var $row = $(templates.generateSongTemplate({songNumber: songNumber, songName: songName, songLength: songLength}));
    
    //create an event click listener within every row/template, calling clickHandler on song-item0number
    $row.find('td.song-item-number').click(clickHandler);
    
    //hover event listener combines mouseover and mouseleave
    $row.hover(onHover, offHover);
    
    //return created row with event listeners attached
    return $row;
};

//var setPlayerInfo = function(album) {
//    
//    var $whosPlayingNow = $(templates.generatePlayerBarSong({album.artist, album.songs})); 
//    
//    console.log($whosPlayingNow);
//    
//    return $whosPlayingNow;
//};



var $albumTitle = $('.album-view-title');
var $albumArtist = $('.album-view-artist');
var $albumReleaseInfo = $('.album-view-release-info');
var $albumImage = $('.album-cover-art');
var $albumSongList = $('.album-view-song-list');

var setCurrentAlbum = function (album) {
    
    currentAlbum = album;
    
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + '' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
    
    $albumSongList.empty();
    
    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        
        $albumSongList.append($newRow);
    }
};


// Store state of playing songs
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;

$(document).ready(function () {
    setCurrentAlbum(albumPicasso);
//    setPlayerInfo(albumPicasso);
});