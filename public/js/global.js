(function(){
    var sayings = [
        "We think you should play:",
        "You should try playing:",
        "How about this game?",
        "We heard this game is good:"
    ];

    $(document).ready(function(){
        $('.getGame').click(function(){
            $(this).parent().hide();
            $('.show-after-animation').css('opacity', 0);
            getGames();
        });
    });

    function getGames(){
        var $steamID;

        if ( ($steamID = $('#steam-id').val()) ){
            $.ajax({
                type: 'GET',
                dataType: 'json',
                url: 'user/' + $steamID + '/randomgame/20',
                success: function (data){
                    addGamesToPage(data);
                    startAnimation();
                },
                error: function (error){
                    $('#game__image').text('Please try again.');
                }
            });
        }
    }

    function addGamesToPage(gamesJson){
        var gameId, gameName, gameImageUrl, gameImage, gameImageHtml, gameLink, gameDiv, gamesDiv;

        gamesDiv = '';       
        for (var i = 0; i < gamesJson.games.length; i++){
                if (gamesJson.games[i].appid){
                    gameId = gamesJson.games[i].appid;
                    gameName = gamesJson.games[i].name;
                    gameImageUrl = gamesJson.games[i].img_logo_url;

                    gameNameHtml = '<p class="game__name">' + gameName + '</p>';
                    gameImage = 'http://media.steampowered.com/steamcommunity/public/images/apps/' + gameId + '/' + gameImageUrl + '.jpg';
                    gameImageHtml = '<p class="game__image"><img src="' + gameImage + '" alt="' + gameName + '"/></p>';
                    gameLinkHtml = '<a title="Click to run or install game" href="steam://run/' + gameId + '">' + gameNameHtml + '</a>';
                
                    gameDiv = '<div class="game">' + gameImageHtml + gameLinkHtml + '</div>';
                    gamesDiv += gameDiv;
                }
            }

            $('#games').html(gamesDiv);
    }

    function startAnimation(){
        $('.game').hide();
        var timesToRun = Math.floor(Math.random() * (45)) + 10;

        animateNextGame($('.game').first(), timesToRun);
    }

    function animateNextGame($selector, runThisManyTimes){
        if (runThisManyTimes == 0){
            return unveilGame($selector);
        }

        $selector.fadeToggle(100, function(){
            $(this).fadeToggle(100);
            if ($(this).next().length > 0){
                animateNextGame($(this).next(), runThisManyTimes - 1);
            }
            else {
                animateNextGame($('.game').first(), runThisManyTimes - 1);
            }
        });
    }

    function unveilGame($selector){
        // show the game and user options to play after brief delay
        setTimeout(function(){
            displayText();
            $selector.fadeToggle(5000)
        }, 1000);

        // Keep options close to game container
        $('#games').height($('.game:visible').height() + 5);
        setTimeout(function(){$('.options').fadeToggle(2000)}, 4000);
    }

    function displayText(){
        var randomNumber = Math.floor(Math.random() * sayings.length);
        $('.show-after-animation').text(sayings[randomNumber]);
        $('.show-after-animation').fadeTo(2500, 1);
    };

})();