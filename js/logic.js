// JavaScript function that wraps everything
$(document).ready(function() {

    // Initialize count down timer variable so that it 
    // can be stopped using clearInterval
    var countDown; 
    // Keeps track of question number
    var questionIndex = 0;
    // Number of seconds for countdown timer
    var time = 15; 
    // Stores correct and incorrect answers
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

    // Ready, set, begin countdown
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

    // Loads new queestion and answer choices
    function loadQuestion(questionIndex) {
        $('#question-number').text('Question ' + (questionIndex + 1));
        $('#question').text(questions[questionIndex].question);
        $('#answer-1').text(questions[questionIndex].answers[0]);
        $('#answer-2').text(questions[questionIndex].answers[1]);
        $('#answer-3').text(questions[questionIndex].answers[2]);
        $('#answer-4').text(questions[questionIndex].answers[3]);
        // Update image
        updateImage(questions[questionIndex].imageId);
        // Display new question
        $('#quiz').fadeIn(1000);
        // Resets timer
        time = 15;
        // Starts new timer
        timer();
    }

    // Loads new question or ends game if all questions are completed
    function nextQuestion() {
        // Updates question number
        questionIndex++;
        if (questionIndex > (questions.length - 1)) {
            endGame();
        } else {
            loadQuestion(questionIndex);
        }
    }

    // Calculates score and displays score view
    function showScore() {
        var percentage = (correctAnswers / (correctAnswers + incorrectAnswers)) * 100;        
        $('#percentage').text(Math.round(percentage).toString() + '%');
        $('#correct').text(correctAnswers.toString() + ' Correct');
        $('#incorrect').text(incorrectAnswers.toString() + ' Incorrect'); 
        $('.image').attr('id', 'solar-system').attr('src', 'images/solar-system.png'); 
        $('#score').show(1000);
        $('#done').click(function(){
            reset();
        });       
    }

    // Checks whether answer is correct or incorrect
    function checkAnswer(questionIndex, answerIndex) {
        stopTimer();
        // Prevents css :focus from getting stuck on answer
        document.getElementById("answer-" + (answerIndex + 1)).blur();
        var answer = questions[questionIndex].correctAnswer;
        if (answerIndex === answer) {
            correctAnswers++;
            // Notifies player whether they answered correctly 
            $('#timer').css('color', 'green').text('Correct');
            setTimeout(() => {
                // Resets timer text
                $('#timer').text('15');
                // Loads next question
                nextQuestion();
            }, 1000);
        } else {
            incorrectAnswers++;
            // Notifies player whether they answered incorrectly 
            $('#timer').css('color', 'red').text('Incorrect').shake({
                interval: 100,
                distance: 20,
                times: 5
            });
            setTimeout(() => {
                // Resets timer text
                $('#timer').text('15');
                // Loads next question
                nextQuestion();
            }, 1000);
        }
    }

    // Kills timer
    function stopTimer() {
        window.clearInterval(countDown);
    }

    // Begins game
    function startGame() {
        // Hide home 
        $('#home').hide()
        // Load first question
        loadQuestion(questionIndex);

        // Answer button listeners
        $('#answer-1').click(function(){
            checkAnswer(questionIndex, 0);
        });
        $('#answer-2').click(function(){
            checkAnswer(questionIndex, 1);
        });
        $('#answer-3').click(function(){
            checkAnswer(questionIndex, 2);
        });
        $('#answer-4').click(function(){
            checkAnswer(questionIndex, 3);
        });
        
    }

    // Ends game
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

    // Updates image with corresponding question ID
    function updateImage(imageId) {
        switch (imageId) {
            case 'sun': 
                $('.image').attr('id', 'sun').attr('src', 'images/sun.png'); 
                break
            case 'moon': 
                $('.image').attr('id', 'moon').attr('src', 'images/moon.png'); 
                break
            case 'earth': 
                $('.image').attr('id', 'earth').attr('src', 'images/earth.png');
                break
            case 'mars': 
                $('.image').attr('id', 'mars').attr('src', 'images/mars.png');
                break
            case 'jupiter': 
                $('.image').attr('id', 'jupiter').attr('src', 'images/jupiter.png'); 
                break
            case 'saturn': 
                $('.image').attr('id', 'saturn').attr('src', 'images/saturn.png'); 
                break
            case 'venus': 
                $('.image').attr('id', 'venus').attr('src', 'images/venus.png'); 
                break    
            case 'mercury': 
                $('.image').attr('id', 'mercury').attr('src', 'images/mercury.png'); 
                break  
            case 'uranus': 
                $('.image').attr('id', 'uranus').attr('src', 'images/uranus.png'); 
                break   
            case 'neptune': 
                $('.image').attr('id', 'neptune').attr('src', 'images/neptune.png'); 
                break  
            case 'galaxy': 
                $('.image').attr('id', 'galaxy').attr('src', 'images/galaxy.png'); 
                break    
        }
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


    // Loads home page
    reset();

    // Triggers start of game
    $('#start-quiz').click(function(){
        // Prevents css :focus from being applied to start button 
        document.getElementById("start-quiz").blur();
        // Get player ready 
        readySet();
    });
    

});