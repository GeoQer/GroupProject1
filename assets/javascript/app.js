// igdb API Documentation: https://igdb.github.io/api/
// Twitch API  Documentation: https://dev.twitch.tv/docs

var proxyServerURL = "https://damp-everglades-65293.herokuapp.com/";
var igdbClientID = "efabb003d9fafebaa5de78b86216cd85";
var igdbQueryURL = "https://api-endpoint.igdb.com";
var twitchClientID = "vaio0m3xzniwve47sl16xucnwvluef";
var twitchQueryURL = "https://api.twitch.tv/helix";
var twitchGameID; 
var gameName;
var igdbID;
var igdbNameReturn;
var igdbSummaryReturn;
var igdbEsrbReturn;
var igdbGameImages = [];
var gameResponce;
var twitchUserID;
var twitchUserNameReturn;
var igdbReviewPercent;
var idgbReviewAmount;
var twitchVideoURLBase = "https://player.twitch.tv/?channel="
var lastLookup = "";
var gName2;

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBI7IaKzIvByErQWy6uA94tzrW8l-gZRK8",
    authDomain: "gamesearch-groupproject1.firebaseapp.com",
    databaseURL: "https://gamesearch-groupproject1.firebaseio.com",
    projectId: "gamesearch-groupproject1",
    storageBucket: "gamesearch-groupproject1.appspot.com",
    messagingSenderId: "793919826809"
};
firebase.initializeApp(config);

var database = firebase.database();


// Document ready function
$(document).ready(function () {

    database.ref().on('child_added', function (childSnapshot) {
        console.log(childSnapshot.val().name);
        console.log(childSnapshot.val().id);
        /* lastLookup = childSnapshot.val(); */
        $("#searchls").prepend('<button class = "gamebtn" value="' + parseInt(childSnapshot.val().id) + '">' + childSnapshot.val().name);
    });

    $("#searchls").on("click", ".gamebtn", function (event) {
        //event.preventDefault();
        $("#searchls").empty();
        igdbID = parseInt($(this).attr("value"));
        gName2 = $(this).attr("id");
        console.log(igdbID);
        callTwo();
        var gameHistory = {
            name: gName2,
            id: igdbID,
        };
        database.ref().push(gameHistory);

    });
    $("#add-game").on("click", function (event) {
        event.preventDefault();
        gameName = $('#game-input').val().trim();
        $('#searchls').empty();

        $.ajax({
            type: 'GET',
            url: proxyServerURL + igdbQueryURL + '/games/?search=' + gameName + '&filter[category][eq]=0&fields=*&limit=15',
            dataType: 'json',
            headers: {
                'user-key': igdbClientID,
                'Accept': 'application/json'
            }
        }).then(function (response) {
            for (let j = 0; j < response.length; j++) {
                gameResponce = response[j];

                $("#searchls").append('<button class = "gamebtn" value="' + gameResponce.id + '" id = "' + gameResponce.name + '">' + gameResponce.name);
                console.log(gameResponce.id);
            }
            //console.log(response);
            igdbID = response[0].id;// The 0 will be what in the array the user selects ( add event grabers)
            //console.log(igdbID);

        });
    });
    function callTwo() {
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

            twitchSearchFunction(igdbNameReturn);//calls twitch search

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
            };
            $("#info").empty();
            $("#info").text("Game Summary: " + igdbSummaryReturn);
            $("#info").append("<br>");
            $("#info").append("<p class='bold'>Rated ESRB: " + igdbEsrbReturn + "</p>");

            $("#gName").empty();
            $("#gName").text("Game Name: " + igdbNameReturn);
            $("#fortnite").empty();
            $("#fortnite").attr('src', response[0].cover.url);

            console.log(igdbGameImages);

            // igdbGameImages.push(response[0].cover.url);
            // for (let i = 0; i < response[0].screenshots.length; i++) {
            //     igdbGameImages.unshift(response[0].screenshots[i].url);
            // }

            idgbReviewAmount = response[0].total_rating_count;
            igdbReviewPercent = response[0].total_rating;

            console.log("Rating Percent: " + igdbReviewPercent + " Amount Rated: " + idgbReviewAmount);
            console.log("ID Number: " + igdbID + "- Game Name: " + igdbNameReturn);
            console.log("Game Summary: " + igdbSummaryReturn);
            console.log("Rated ESRB: " + igdbEsrbReturn);

        }).then(function () {
            $.ajax({
                type: 'GET',
                url: proxyServerURL + igdbQueryURL + '/reviews/' + igdbID + '?&fields=*',
                dataType: 'json',
                headers: {
                    'user-key': igdbClientID,
                    'Accept': 'application/json'
                }
            }).then(function (response) {
                console.log(response[0].review_rating);

                $(".review").empty();
                $(".review").text(response[0].review_rating + ' out of 10');
            })
        });
    };



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
            console.log(response); //response for details of game from twitch
            console.log(response.data[0].id);
            twitchGameID = response.data[0].id;
            console.log(twitchGameID)

            //return twitchGameID;
            getStreamer(twitchGameID)

        });
    };
    function getStreamer() {

        //only AFTER that is finished and we have the ID of game 
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


        console.log("Twitch Game ID: " + twitchGameID),

            $.ajax({
                type: 'GET',
                url: twitchQueryURL + '/streams?game_id=' + twitchGameID, //URL + the ID of game
                dataType: 'json',
                headers: {
                    'Client-ID': twitchClientID,
                },
            }).then(function (response) {
                console.log(response.data[0].user_id);// array for twitch streams info (gives most populat stream)

                twitchUserID = response.data[0].user_id;
                stream(twitchGameID)
            });
    };

    function stream() {
        $.ajax({
            type: 'GET',
            url: twitchQueryURL + '/users?id=' + twitchUserID, //information on user streaming
            dataType: 'json',
            headers: {
                'Client-ID': twitchClientID,
            },
        }).then(function (response) {
            console.log(response.data[0]);

            twitchUserNameReturn = response.data[0].display_name;

            console.log(twitchUserNameReturn);

            var newTwitchVideoURL = twitchVideoURLBase + twitchUserNameReturn;

            console.log(newTwitchVideoURL)

            $("#twitchVideo").attr("src", newTwitchVideoURL);

        });
    };

});
//});
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