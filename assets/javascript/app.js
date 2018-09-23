
// igdb API Documentation: https://igdb.github.io/api/
// Twitch API  Documentation: https://dev.twitch.tv/docs

var proxyServerURL = "https://damp-everglades-65293.herokuapp.com/"
var igdbClientID = "efabb003d9fafebaa5de78b86216cd85"
var igdbQueryURL = "https://api-endpoint.igdb.com"
var twitchClientID = "vaio0m3xzniwve47sl16xucnwvluef"
var twitchQueryURL = "https://api.twitch.tv/helix"
var twitchGameID = "33214" // hard coded game ID var
var gameName = "Diablo"
var igdbID;
var igdbNameReturn;
var igdbSummaryReturn;
var igdbEsrbReturn;
var igdbGameImages = [];
var twitchGameID;

// Document ready function
$(document).ready(function () {

    $.ajax({
        type: 'GET',
        url: proxyServerURL + igdbQueryURL + '/games/?search=' + gameName + '&filter[category][eq]=0&fields=*&limit=15',
        dataType: 'json',
        headers: {
            'user-key': igdbClientID,
            'Accept': 'application/json'
        }
    }).then(function (response) {
        console.log(response);
        igdbID = response[0].id;// The 0 will be what in the array the user selects ( add event grabers)
        console.log(igdbID);

    }).then(function () {
        $.ajax({
            type: 'GET',
            url: proxyServerURL + igdbQueryURL + '/games/' + igdbID + '?search=&fields=*',
            dataType: 'json',
            headers: {
                'user-key': igdbClientID,
                'Accept': 'application/json'
            }
        }).then(function (response) {
            igdbGameImages = []; // clears images

           
            console.log(response[0]);
            igdbNameReturn = response[0].name;
            igdbSummaryReturn = response[0].summary;
            switch (response[0].esrb.rating) {
                case 1:
                    igdbEsrbReturn = "RP"
                    break;
                case 2:
                    igdbEsrbReturn = "EC"
                    break;
                case 3:
                    igdbEsrbReturn = "E"
                    break;
                case 4:
                    igdbEsrbReturn = "E10+"
                    break;
                case 5:
                    igdbEsrbReturn = "T"
                    break;
                case 6:
                    igdbEsrbReturn = "M"
                    break;
                case 7:
                    igdbEsrbReturn = "AO"
            }

            igdbGameImages.push(response[0].cover.url); 
            for (let i = 0; i < response[0].screenshots.length; i++) {
                igdbGameImages.unshift(response[0].screenshots[i].url);
            }
            

            
            console.log(igdbGameImages[3]);

            console.log("ID Number: " + igdbID + "- Game Name: " + igdbNameReturn);
            console.log("Game Summary: " + igdbSummaryReturn);
            console.log("Rated ESRB: " + igdbEsrbReturn);

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
                url: twitchQueryURL + '/streams?game_id=' + twitchGameID, //URL + the ID of game
                dataType: 'json',
                headers: {
                    'Client-ID': twitchClientID,
                },
            }).then(function (response) {
                console.log(response)// array for twitch streams info
            })
        );
    }

    // twitchSearchFunction();

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


