
var twitchClientID = "vaio0m3xzniwve47sl16xucnwvluef"
var twitchQueryURL = "https://api.twitch.tv/helix"
console.log(twitchQueryURL);

// Document ready function
$(document).ready(function () {

    twitchSearchFunction

    function twitchSearchFunction() { //funtion for twitch search put into a funtion for callback reasons
        // ajax call for twitch to give game ID
        $.ajax({
            type: 'GET',
            url: twitchQueryURL + "/", //URL + name of game and search perams. need to look up how
            dataType: 'json',
            headers: {
                'Client-ID': twitchClientID,
            },
        }).then(function (response) {
            console.log(response); //response for details of game from twitch
    
            var gameID = "33214" //hardcoded game id var (replace with parsed )

            // aperently needs to be pushed to a global var for it to be called bellow?
    
        }).then( //only AFTER that is finished and we have the ID of game 
            //Run ajax to grab stream data from twich useing ID of game
            $.ajax({
                type: 'GET',
                url: twitchQueryURL + '/streams?game_id=' + gameID, //URL + the ID of game
                dataType: 'json',
                headers: {
                    'Client-ID': twitchClientID,
                },
            }).then(function (response) {
                console.log(response)// array for twitch streams info
            })
        );
    }

})

