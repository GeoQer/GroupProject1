
// igdb API Documentation: https://igdb.github.io/api/
// Twitch API  Documentation: https://dev.twitch.tv/docs

var proxyServerURL = "https://damp-everglades-65293.herokuapp.com/"
var igdbClientID = "efabb003d9fafebaa5de78b86216cd85"
var igdbQueryURL = "https://api-endpoint.igdb.com"
var twitchClientID = "vaio0m3xzniwve47sl16xucnwvluef"
var twitchQueryURL = "https://api.twitch.tv/helix"
var twitchVideoURLBase = "https://player.twitch.tv/?channel="
var gameName = "PLAYERUNKNOWN'S BATTLEGROUNDS"
var igdbID;
var igdbNameReturn;
var igdbSummaryReturn;
var igdbEsrbReturn;
var igdbGameImages = [];
var twitchGameID;
var twitchUserID;
var twitchUserNameReturn;
var igdbReviewPercent;
var idgbReviewAmount;

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

            twitchSearchFunction();//calls twitch search

            igdbSummaryReturn = response[0].summary;

            if (response[0].esrb) {
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
            }
            else {
                igdbEsrbReturn = "N/A"
            }


            igdbGameImages.push(response[0].cover.url);
            for (let i = 0; i < response[0].screenshots.length; i++) {
                igdbGameImages.unshift(response[0].screenshots[i].url);
            }

            idgbReviewAmount = response[0].total_rating_count;
            igdbReviewPercent = response[0].total_rating;

            console.log("Rating Percentage: " + igdbReviewPercent + " Times Rated: " + idgbReviewAmount);
            console.log("ID Number: " + igdbID + "- Game Name: " + igdbNameReturn);
            console.log("Game Summary: " + igdbSummaryReturn);
            console.log("Rated ESRB: " + igdbEsrbReturn);



        });
    })



    function twitchSearchFunction() { //funtion for twitch search put into a funtion for callback reasons
        // ajax call for twitch to give game ID


        $.ajax({
            type: 'GET',
            url: twitchQueryURL + "/games?name=" + igdbNameReturn, //URL + name of game and search perams. need to look up how
            dataType: 'json',
            headers: {
                'Client-ID': twitchClientID,
            },
        }).then(function (response) {
            console.log(response.data); //response for details of game from twitch

            twitchGameID = response.data[0].id;

            return twitchGameID;

        }).then(function (twitchGameID) {


            //only AFTER that is finished and we have the ID of game 
            //Run ajax to grab stream data from twich useing ID of game

            console.log("Twitch Game ID: " + twitchGameID),

                $.ajax({
                    type: 'GET',
                    url: twitchQueryURL + '/streams?game_id=' + twitchGameID, //URL + the ID of game
                    dataType: 'json',
                    headers: {
                        'Client-ID': twitchClientID,
                    },
                }).then(function (response) {
                    console.log(response.data[0]);// array for twitch streams info (gives most populat stream)

                    return twitchUserID = response.data[0].user_id;


                }).then(function (twitchUserID) {
                    $.ajax({
                        type: 'GET',
                        url: twitchQueryURL + '/users?id=' + twitchUserID, //information on user streaming
                        dataType: 'json',
                        headers: {
                            'Client-ID': twitchClientID,
                        },
                    }).then(function(response) {
                        console.log(response.data[0]);

                        twitchUserNameReturn = response.data[0].display_name;

                        console.log(twitchUserNameReturn);

                        var newTwitchVideoURL = twitchVideoURLBase + twitchUserNameReturn;

                        console.log(newTwitchVideoURL)

                        $("#twitchVideo").attr("src", newTwitchVideoURL);

                    })
                })
        });
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


