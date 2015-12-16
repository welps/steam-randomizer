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
                    var gameImage = 'http://media.steampowered.com/steamcommunity/public/images/apps/' + data.appid + '/' + data.img_logo_url + '.jpg';
                    $('#game p').html('<img src="' + gameImage + '" alt="' + data.name + '"/>');
                },
                error: function (error){
                    $('#game p').text('Please try again.');
                }
            });
        }
    }

})();