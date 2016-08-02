var pointsArray = document.getElementsByClassName('point');

var animatePoints = function() {
    
    var revealPoint = function() {
        $(this).css({
            opacity: 1,
            transform: 'scaleX(1) translateY(0)'
        });
    };

        $.each($('.point'), revealPoint);
    };

/*addEventListener takes 3 arguments, but here we use just two (third is useCapture and is optional)*/
/* addEventListener(type, listener/function, useCapture/boolean)*/
$(window).load(function() {
    
    if ($(window).height() > 950) {
        animatePoints();
    }
    
//    var sellingPoints = document.getElementsByClassName('selling-points')[0];
//    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
    
    var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;
    
//    window.addEventListener('scroll', function(event) {
//        if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
//            animatePoints(pointsArray)
//        }    
//    });
    
    $(window).scroll(function(event) {
       if ($(window).scrollTop() >= scrollDistance) {
            animatePoints();
           }
    });
    
});

