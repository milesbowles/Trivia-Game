
// JavaScript function that wraps everything
$(document).ready(function() {

    // Gets Link for Theme Song
//        var audioElement = document.createElement("audio");
//        audioElement.setAttribute("src", "Assets/captainplanet24.mp3");

    // Theme Button
//        $(".theme-button").on("click", function() {
//            audioElement.play();
//        });
//
//        $(".pause-button").on("click", function() {
//            audioElement.pause();
//        });




    $.fn.animateRotate = function(angle, duration, easing, complete) {
        var args = $.speed(duration, easing, complete);
        var step = args.step;
        return this.each(function(i, e) {
            args.complete = $.proxy(args.complete, e);
            args.step = function(now) {
                $.style(e, 'transform', 'rotate(' + now + 'deg)');
                if (step) return step.apply(e, arguments);
            };

            $({deg: 0}).animate({deg: angle}, args);
        });
    };


    function enter() {
        $("#img").fadeIn().animateRotate(30, 9000).animate({
            'height' : '40%',
            'width' : '40%',
            'display' : 'block',
            'margin-left' : '30%'
        }, 9000);
    }

    $('.box').click(function() {

        $(this).animate({
            left: '-50%'
        }, 4000, function() {
            $(this).css('left', '150%').animateRotate(90, 4000);
            $(this).css('left', '150%');
            $(this).appendTo('#img-container');

        });

        $(this).next().animate({
            left: '50%'
        }, 4000);
    });


    // Size Buttons
    $(".normal-button").on("click", function() {
        $("#img").animateRotate(30);
    });



    // Move Buttons
    $(".shrink-button").on("click", function() {
        enter();
    });

    $(".down-button").on("click", function() {
        $(".captain-planet").animate({ top: "+=200px" }, 3000);
    });

    $(".left-button").on("click", function() {
        $(".captain-planet").animate({ left: "-=200px" }, 3000);
    });

    $(".right-button").on("click", function() {
        $(".captain-planet").animate({ left: "+=200px" }, 3000);
    });

    $(".back-button").on("click", function() {
        $(".captain-planet").animate({ top: "50px", left: "80px" }, "fast");
    });



});