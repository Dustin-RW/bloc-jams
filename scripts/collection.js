var collectionItemTemplate =
    '<div class="collection-album-container column fourth">'
    + '   <img src="assets/images/album_covers/01.png"/>'
    + '   <div class="collection-album-info caption">'
    + '       <p>'
    + '           <a class="album-name" href="/album.html"> The Colors </a>'
    + '           <br/>'
    + '           <a href="/album.html"> Pablo Picassp </a>'
    + '           <br/>'
    + '           X songs'
    + '           <br/>'
    + '       </p>'
    + '   </div>'
    + '</div>'
;

window.onload = function() {
    // selected just the first element with an album-cover script name
    var collectionContainer = document.getElementsByClassName('album-covers')[0];
    //assign empty string to collectionContainers innerHTML property to clear its content
    collectionContainer.innerHTML = '';
    
    for ( var i = 0; i < 12; i++) {
        collectionContainer.innerHTML += collectionItemTemplate;
    }
}
    