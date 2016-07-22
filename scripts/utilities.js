var forEach = function(arrayLikeObject, callback) {
    
    for (var i = 0; i < arrayLikeObject.length; i++) {
        callback(arrayLikeObject[i]);
    }
};