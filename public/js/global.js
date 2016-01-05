(function(){

    $(document).ready(function(){
        getGames();
        $('#getGame').click(function(){
            location.reload();
        });
    });

    function getGames(){
        var $steamId;

        if ( ($steamId = $('#steam-id').val()) ){
            $.ajax({
                type: 'GET',
                dataType: 'json',
                url: 'user/' + $steamId + '/randomgame/10',
                success: function (data){
                    addGamesToPage(data);
                    pickGame();
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

    function pickGame(){
        $('.game').hide();
        var timesToRun = Math.floor(Math.random() * (50)) + 5;

        showNextGame($('.game').first(), timesToRun);
    }

    function showNextGame($selector, runThisManyTimes){
        if (runThisManyTimes == 0){
            // show the game to play after brief delay
            setTimeout(function(){$selector.fadeToggle(5000)}, 1000);
            return;
        }

        $selector.fadeToggle(100, function(){
            $(this).fadeToggle(100);
            if ($(this).next().length > 0){
                showNextGame($(this).next(), runThisManyTimes - 1);
            }
            else {
                showNextGame($('.game').first(), runThisManyTimes - 1);
            }
        });
    }
})();