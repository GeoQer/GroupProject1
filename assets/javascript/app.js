
// igdb API Documentation: https://igdb.github.io/api/
// Twitch API  Documentation: https://dev.twitch.tv/docs

var proxyServerURL = "https://damp-everglades-65293.herokuapp.com/"
var igdbClientID = "efabb003d9fafebaa5de78b86216cd85"
var igdbQueryURL = "https://api-endpoint.igdb.com"
var twitchClientID = "vaio0m3xzniwve47sl16xucnwvluef"
var twitchQueryURL = "https://api.twitch.tv/helix"
var twitchGameID = "33214" // hard coded game ID var
var gameName = "Hitman"
var igdbID;

// Document ready function
$(document).ready(function () {

    $.ajax({
        type: 'GET',
        url: proxyServerURL + igdbQueryURL + '/games/?search='+ gameName + '&fields=*',
        dataType: 'json',
        headers: {
            'user-key': igdbClientID,
            'Accept': 'application/json'
        }
    }).then(function (response) {
        console.log(response);
        igdbID = response[0].id;
        console.log(igdbID);
        
    }).then(function(){
        $.ajax({
            type: 'GET',
            url: proxyServerURL + igdbQueryURL + '/games/' + igdbID + '?search=&fields=*',
            dataType: 'json',
            headers: {
                'user-key': igdbClientID,
                'Accept': 'application/json'
            }
        }).then(function (response) {
            console.log(igdbID);
            console.log(response);
            
        });
    })

    

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

    twitchSearchFunction;

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

    
