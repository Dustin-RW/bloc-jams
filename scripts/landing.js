var pointsArray = document.getElementsByClassName('point');

//console.log(pointsArray);
var animatePoints = function() {
    forEach(pointsArray, function(point) {
        point.style.opacity = 1;
        point.style.transform = "scaleX(1) translateY(0)";
        point.style.msTransform = "scaleX(1) translateY(0)";
        point.style.WebkitTransform = "scaleX(1) translateY(0)";
    });            
//            this.style.opacity = 1;
//            this.style.transform = "scaleX(1) translateY(0)";
//            this.style.msTransform = "scaleX(1) translateY(0)";
//            this.style.WebkitTransform = "scaleX(1) translateY(0)";
//    
    //    var revealPoints = function(node) {
//        for ( i = 0; i < node.length; i++) {
//            node[i].style.opacity = 1;
//            node[i].style.transform = "scaleX(1) translateY(0)";
//            node[i].style.msTransform = "scaleX(1) translateY(0)";
//            node[i].style.WebkitTransform = "scaleX(1) translateY(0)";
//        }
//    };

        /*var revealFirstPoint = function() {
            points[0].style.opacity = 1;
            points[0].style.transform = "scaleX(1) translateY(0)";
            points[0].style.msTransform = "scaleX(1) translateY(0)";
            points[0].style.WebkitTransform = "scaleX(1) translateY(0)";
        }

        var revealSecondPoint = function() {
            points[1].style.opacity = 1;
            points[1].style.transform = "scaleX(1) translateY(0)";
            points[1].style.msTransform = "scaleX(1) translateY(0)";
            points[1].style.WebkitTransform = "scaleX(1) translateY(0)";
        }

        var revealThirdPoint = function() {
            points[2].style.opacity = 1;
            points[2].style.transform = "scaleX(1) translateY(0)";
            points[2].style.msTransform = "scaleX(1) translateY(0)";
            points[2].style.WebkitTransform = "scaleX(1) translateY(0)";
        }*/

        //revealPoints(points);
    
        //pointsArray.forEach(revealPoints);
    };



/*addEventListener takes 3 arguments, but here we use just two (third is useCapture and is optional)*/
/* addEventListener(type, listener/function, useCapture/boolean)*/
window.onload = function() {
    // Automatically animate the points on a tall screen where scrolling can't trigger the animation
    if (window.innerHeight > 950) {
        animatePoints(pointsArray);
    }
    
    var sellingPoints = document.getElementsByClassName('selling-points')[0];
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
    
    window.addEventListener('scroll', function(event) {
        if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
            animatePoints(pointsArray)
        }    
    });
}

