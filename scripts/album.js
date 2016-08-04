var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { title: 'Blue', duration: '4:26' },
        { title: 'Green', duration: '3:14' },
        { title: 'Red', duration: '5:01' },
        { title: 'Pink', duration: '3:21' },
        { title: 'Magenta', duration: '2:15' }
    ]
};

var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { title: 'Hello, Operator', duration: '1:01' },
        { title: 'Ring, ring, ring', duration: '5:01' },
        { title: 'Fits in your pocket', duration: '3:21' },
        { title: 'Can you hear me now?', duration: '3:14' },
        { title: 'Wrong phone number', duration: '2:15' }
    ] 
};

var albumForeigner = {
    title: 'Agent Provocateur',
    artist: 'Foreigner',
    label: 'Studio',
    year: '1984',
    albumArtUrl: 'assets/images/album_covers/18.png',
    songs: [
        { title: 'Tooth and Nail', duration: '3:54' },
        { title: 'That was Yesterday', duration: '3:50' },
        { title: 'I Want To Know What Love Is', duration: '3:21' },
        { title: 'Growing Up the Hard Way', duration: '3:14' },
        { title: 'Reaction to Action', duration: '2:15' },
        { title: 'Reaction to Action', duration: '2:15' }
    ] 
};

var allAlbums = [albumPicasso, albumMarconi, albumForeigner];

var templates = templateGeneratorModule;

//Templates
var playButtonTemplate = templates.playButtonTemplate;
var pauseButtonTemplate = templates.pauseButtonTemplate;

// Store state of playing songs
var currentlyPlayingSong = null;
var clickHandler = function(event) {
    var songItem = $(this);
    var songNum = songItem.attr('data-song-number');


    if (currentlyPlayingSong === null) {
      songItem.html(pauseButtonTemplate);
      currentlyPlayingSong = songNum;

    } else if (currentlyPlayingSong === songNum) {
      songItem.html(playButtonTemplate);
      currentlyPlayingSong = null;

    } else if (currentlyPlayingSong !== songNum) {
      var currentlyPlayingSongElement = $('[data-song-number="' + currentlyPlayingSong + '"]');
      currentlyPlayingSongElement.html(currentlyPlayingSongElement.attr('data-song-number'));
      songItem.html(pauseButtonTemplate);
      currentlyPlayingSong = songNum;
    }
};

 var onHover = function(event) {
    var $songNumberItem = $(this).find('td.song-item-number');
    var $songNum = $songNumberItem.attr('data-song-number');


    if ($songNum !== currentlyPlayingSong) {
        $songNumberItem.html(playButtonTemplate);
    }

};

var offHover = function(event) {
    var $songNumberItem = $(this).find('td.song-item-number');
    var $songNum = $songNumberItem.attr('data-song-number');

    if ($songNum !== currentlyPlayingSong) {
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





$(document).ready(function () {
    setCurrentAlbum(albumPicasso);
    

});