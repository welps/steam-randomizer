(function(){
    $(document).ready(function(){
        grabGame();
        $('#getGame').click(function(){
            grabGame();
        });
    });

    function grabGame(){
        var $steamId;

        if ( ($steamId = $('#steam-id').val()) ){
            $.ajax({
                type: 'GET',
                dataType: 'json',
                url: 'users/randomgame/' + $steamId,
                success: function (data){
                    var gameId = data.appid;
                    var gameName = data.name;
                    var gameImageUrl = data.img_logo_url;

                    var gameImage = 'http://media.steampowered.com/steamcommunity/public/images/apps/' + gameId + '/' + gameImageUrl + '.jpg';
                    var gameImageHtml = '<img src="' + gameImage + '" alt="' + gameName + '"/>';
                    var gameLink = '<a href="steam://run/' + gameId + '"></a>';

                    $('#game__image').html(gameLink);
                    $('#game__image > a').append(gameImageHtml);
                    $('#game__name').html(gameLink);
                    $('#game__name > a').append(gameName);
                },
                error: function (error){
                    $('#game__image').text('Please try again.');
                }
            });
        }
    }

})();