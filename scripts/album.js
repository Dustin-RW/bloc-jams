var allAlbums = [albumPicasso, albumMarconi, albumForeigner];

var templates = templateGeneratorModule;

//Templates
var playButtonTemplate = templates.playButtonTemplate;
var pauseButtonTemplate = templates.pauseButtonTemplate;
var playerBarPlayButton = templates.playerBarPlayButton;
var playerBarPauseButton = templates.playerBarPauseButton;

var clickHandler = function() {
    var songItem = $(this);
    var songNumber = songItem.attr('data-song-number');
    
    if (currentlyPlayingSongNumber !== null) {
        var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
        
        currentlyPlayingCell.html(currentlyPlayingSongNumber);
        updatePlayerBarSong();
    }
    
    if (currentlyPlayingSongNumber !== songNumber) {
        $(this).html(pauseButtonTemplate);
        currentlyPlayingSongNumber = songNumber;
        currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
        updatePlayerBarSong();
    } else if (currentlyPlayingSongNumber === songNumber) {
        $(this).html(playButtonTemplate);
        $('.main-controls .play-pause').html(playerBarPlayButton);
        currentlyPlayingSongNumber = null;
        currentSongFromAlbum = null;
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

var trackIndex = function (album, song) {
  return album.songs.indexOf(song);  
};

var updatePlayerBarSong = function() {
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    
    $('.main-controls .play-pause').html(playerBarPauseButton);
};

var nextSong = function() {
    
    var getLastSongNumber = function(index) {
        return index == 0 ? currentAlbum.songs.length : index;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _incrementing_ the song here
    currentSongIndex++;
    
    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }
    
    // Set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};

var previousSong = function() {
    
    // Note the difference between this implementation and the one in
    // nextSong()
    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _decrementing_ the index here
    currentSongIndex--;
    
    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }
    
    // Set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};


// Store state of playing songs
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function () {
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
    
});