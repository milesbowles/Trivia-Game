
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

    var questions = [
        {
            question : 'What year did the humans first land on the moon?',
            answers : ['1951', '1969', '1954', '1964'],
            correctAnswer : 1, // index of correct anwers
            imageId : 'moon'
        },
        {
            question : 'Which one is not a type of galaxy?',
            answers : ['Irregular', 'Elliptical', 'Orbital', 'Spiral'],
            correctAnswer : 2, // index of correct anwers
            imageId : 'galaxy'
        },
        {
            question : 'What process fuels the sun?',
            answers : ['Photosynthesis', 'Nuclear Fusion', 'Prescipitation', 'Condensation'],
            correctAnswer : 1, // index of correct anwers
            imageId : 'sun'
        },
        {
            question : 'Which of these facts about Venus is NOT true?',
            answers : ['Was named after a Roman goddess', 'Is second brightest object in the sky', '1 day is longer than a year on Earth', 'Has a very strong magnetic field'],
            correctAnswer : 3, // index of correct anwers
            imageId : 'venus'
        },
        {
            question : 'Which of these is true about Mercury?',
            answers : ['It is the smallest planet', 'It is the most dense planet', 'It is the hottest planet', 'A year on Mercury is just 44 days long'],
            correctAnswer : 0, // index of correct anwers
            imageId : 'mercury'
        },
        {
            question : 'Which of these is true about Jupiter?',
            answers : ['It is the 6th planet from the Sun', 'It has the shortest day of all the planets', 'It is mostly made up of helium', 'It is the brightest object in the solar system'],
            correctAnswer : 1, // index of correct anwers
            imageId : 'jupiter'
        }
    ];

    // Initialize count down timer variable so that it 
    // can be stopped using clearInterval
    var countDown; 
    var questionIndex = 0;
    var time = 15; // seconds
    var correctAnswers = 0;
    var incorrectAnswers = 0;


    // Question timer
    function timer() {
        $('#timer').css('color', 'white');
        countDown = setInterval(function() {
            if (time === 0) {
                $('#timer').text('Times Up!').shake({
                    interval: 100,
                    distance: 20,
                    times: 5
                });
                stopTimer();
                // next question
                incorrectAnswers++;
                nextQuestion();
            } else if (time < 5) {
                // Sets text color to red to indicate time is almost up
                $('#timer').css('color', 'red').text(time);
            } else {
                // Updates timer text
                $('#timer').text(time); 
            }
            time--;
        }, 1000);
    }


    function readySet() {
        var x = 0;
        for (var i = 0; i <= 3; i++) {
            (function (i) {
                setTimeout(() => {
                    switch (x) {
                        case 0: 
                            $('#ready-text').text('Ready'); 
                            break
                        case 1: 
                            $('#ready-text').text('Set'); 
                            break
                        case 2: 
                            $('#ready-text').text('Begin!'); 
                            break
                        case 3: 
                            startGame();
                            break
                    }
                    x++;
                }, 1000*i);
            })(i);
        };
    }

    function loadQuestion(index) {
        $('#question-number').text('Question ' + (index + 1));
        $('#question').text(questions[index].question);
        $('#answer-1').text(questions[index].answers[0]);
        $('#answer-2').text(questions[index].answers[1]);
        $('#answer-3').text(questions[index].answers[2]);
        $('#answer-4').text(questions[index].answers[3]);
        $('#quiz').fadeIn(1000);
        time = 15;
        timer();
    }

    function nextQuestion() {
        questionIndex++;
        if (questionIndex > (questions.length - 1)) {
            endGame();
        } else {
            loadQuestion(questionIndex);
        }
    }

    function showScore() {
        var percentage = (correctAnswers / (correctAnswers + incorrectAnswers)) * 100;        
        $('#percentage').text(Math.round(percentage).toString() + '%');
        $('#correct').text(correctAnswers.toString() + ' Correct');
        $('#incorrect').text(incorrectAnswers.toString() + ' Incorrect'); 
        $('#score').show(1000);
        $('#done').click(function(){
            reset();
        });       
    }

    function checkAnswer(questionIndex, answerIndex) {
        stopTimer();
        var answer = questions[questionIndex].correctAnswer;
        if (answerIndex === answer) {
            correctAnswers++;
            $('#timer').css('color', 'green').text('Correct');
            setTimeout(() => {
                $('#timer').text('15');
                nextQuestion();
            }, 1000);
        } else {
            incorrectAnswers++;
            console.log(incorrectAnswers);
            
            $('#timer').css('color', 'red').text('Incorrect').shake({
                interval: 100,
                distance: 20,
                times: 5
            });
            setTimeout(() => {
                $('#timer').text('15');
                nextQuestion();
            }, 1000);
        }
    }

    function stopTimer() {
        window.clearInterval(countDown);
    }

    function startGame() {
        // Hide home 
        $('#home').hide();

        // Load first question
        loadQuestion(questionIndex);

        // Answer button listeners
        $('#answer-1').click(function(){
            
            checkAnswer(questionIndex, 0);
        });
        $('#answer-2').click(function(){
            //stopTimer();
            checkAnswer(questionIndex, 1);
        });
        $('#answer-3').click(function(){
            //stopTimer();
            checkAnswer(questionIndex, 2);
        });
        $('#answer-4').click(function(){
            //stopTimer();
            checkAnswer(questionIndex, 3);
        });
        
    }

    function endGame() {
        // End quiz
        $('#quiz').hide();
        // Display results
        showScore();


    }

    // Reset game
    function reset() {
        // Hide score
        $('#quiz').hide();
        $('#score').hide();
        // Go back to main page
        $('#home').fadeIn(1000);
    }


    // Shake animation for timer
    (function($){
        $.fn.shake = function(settings) {
            // Sets default shake interval
            if(typeof settings.interval == 'undefined'){
                settings.interval = 100;
            }
            // Sets default shake distance
            if(typeof settings.distance == 'undefined'){
                settings.distance = 10;
            }
            // Sets default shake distance
            if(typeof settings.times == 'undefined'){
                settings.times = 4;
            }
            // Sets empty function for when animation completes
            if(typeof settings.complete == 'undefined'){
                settings.complete = function(){};
            }
            $(this).css('position','relative');
            for(var i=0; i<(settings.times+1); i++){
                $(this).animate({ left:((i%2 == 0 ? settings.distance : settings.distance * -1)) }, settings.interval);
            }
            $(this).animate({ left: 0}, settings.interval, settings.complete);  
        }; 
    })(jQuery);


    // $.fn.animateRotate = function(angle, duration, easing, complete) {
    //     var args = $.speed(duration, easing, complete);
    //     var step = args.step;
    //     return this.each(function(i, e) {
    //         args.complete = $.proxy(args.complete, e);
    //         args.step = function(now) {
    //             $.style(e, 'transform', 'rotate(' + now + 'deg)');
    //             if (step) return step.apply(e, arguments);
    //         };

    //         $({deg: 0}).animate({deg: angle}, args);
    //     });
    // };

    // // Answer choices
    // $('.btn').click(function() {
    //     $('.box').animate({
    //         left: '-50%'
    //     }, 3000, function() {
    //         $('.box').css('left', '150%');
    //         $('.box').appendTo('#img-container');
    //     }).animateRotate(50, 3000);

    //     $('.box').next().animate({
    //         left: '50%'
    //     }, 3000);

    //     $('.box').animate().animateRotate(90, 4000);
    // });

    // Loads home page
    reset();

    // Triggers start of game
    $('#start-quiz').click(function(){
        readySet();
    });
    

});