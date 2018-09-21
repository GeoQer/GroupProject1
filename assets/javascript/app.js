
// igdb API Documentation: https://igdb.github.io/api/
// Twitch API  Documentation: https://dev.twitch.tv/docs

var igdbClientID = "efabb003d9fafebaa5de78b86216cd85"
var igdbQueryURL = "https://api-endpoint.igdb.com"
var twitchClientID = "vaio0m3xzniwve47sl16xucnwvluef"
var twitchQueryURL = "https://api.twitch.tv/helix"
var gameID = "33214" // hard coded game ID var

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
    
            var gameID = "" //game id var (replace with parsed )

            // aperently needs to be pushed to a global var for it to be called bellow?
            
            // This ajax below has been tested and works. but since it requires previous ajax information it wornt work without hardcodeing
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

//establish variables

// initialize libraries and APIs

//create ajax calls to retrieve information from search bar on-click

//submit search request from the user to IGDB

//display results from IGDB in a list form

//when game is selected by the user:
    //send game name to Twitch API and record official game name to firebase
    
    //display game information from IGDB
    
    //display video feed from Twitch
    
    //display game name on page with search count information from firebase
    
    //display "trending" graph and/or consumer rating graph

    
