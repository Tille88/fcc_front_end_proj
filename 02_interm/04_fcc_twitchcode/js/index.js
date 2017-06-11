//Load in hard coded data
var twitchData = [
  {
    "stream": {
      "mature": false,
      "status": "Greg working on Electron-Vue boilerplate w/ Akira #programming #vuejs #electron",
      "broadcaster_language": "en",
      "display_name": "FreeCodeCamp",
      "game": "Creative",
      "language": "en",
      "_id": 79776140,
      "name": "freecodecamp",
      "created_at": "2015-01-14T03:36:47Z",
      "updated_at": "2016-09-17T05:00:52Z",
      "delay": null,
      "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_image-d9514f2df0962329-300x300.png",
      "banner": null,
      "video_banner": "https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-channel_offline_image-b8e133c78cd51cb0-1920x1080.png",
      "background": null,
      "profile_banner": "https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_banner-6f5e3445ff474aec-480.png",
      "profile_banner_background_color": null,
      "partner": false,
      "url": "https://www.twitch.tv/freecodecamp",
      "views": 161989,
      "followers": 10048,
      "_links": {
        "self": "https://api.twitch.tv/kraken/channels/freecodecamp",
        "follows": "https://api.twitch.tv/kraken/channels/freecodecamp/follows",
        "commercial": "https://api.twitch.tv/kraken/channels/freecodecamp/commercial",
        "stream_key": "https://api.twitch.tv/kraken/channels/freecodecamp/stream_key",
        "chat": "https://api.twitch.tv/kraken/chat/freecodecamp",
        "subscriptions": "https://api.twitch.tv/kraken/channels/freecodecamp/subscriptions",
        "editors": "https://api.twitch.tv/kraken/channels/freecodecamp/editors",
        "teams": "https://api.twitch.tv/kraken/channels/freecodecamp/teams",
        "videos": "https://api.twitch.tv/kraken/channels/freecodecamp/videos"
      }
    },
    "_links": {
      "self": "https://api.twitch.tv/kraken/streams/freecodecamp",
      "channel": "https://api.twitch.tv/kraken/channels/freecodecamp"
    }
  },
  {
    "stream": null,
    "display_name": "OgamingSC2",
    "_links": {
      "self": "https://api.twitch.tv/kraken/streams/ogamingsc2",
      "channel": "https://api.twitch.tv/kraken/channels/ogamingsc2"
    }
  },
  {
    "stream": {
      "mature": false,
      "status": "RERUN: StarCraft 2 - Kane vs. HuK (ZvP) - WCS Season 3 Challenger AM - Match 4",
      "broadcaster_language": "en",
      "display_name": "ESL_SC2",
      "game": "StarCraft II",
      "language": "en",
      "_id": 30220059,
      "name": "esl_sc2",
      "created_at": "2012-05-02T09:59:20Z",
      "updated_at": "2016-09-17T06:02:57Z",
      "delay": null,
      "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/esl_sc2-profile_image-d6db9488cec97125-300x300.jpeg",
      "banner": null,
      "video_banner": "https://static-cdn.jtvnw.net/jtv_user_pictures/esl_sc2-channel_offline_image-5a8657f8393c9d85-1920x1080.jpeg",
      "background": null,
      "profile_banner": "https://static-cdn.jtvnw.net/jtv_user_pictures/esl_sc2-profile_banner-f8295b33d1846e75-480.jpeg",
      "profile_banner_background_color": "#050506",
      "partner": true,
      "url": "https://www.twitch.tv/esl_sc2",
      "views": 60843789,
      "followers": 135275,
      "_links": {
        "self": "https://api.twitch.tv/kraken/channels/esl_sc2",
        "follows": "https://api.twitch.tv/kraken/channels/esl_sc2/follows",
        "commercial": "https://api.twitch.tv/kraken/channels/esl_sc2/commercial",
        "stream_key": "https://api.twitch.tv/kraken/channels/esl_sc2/stream_key",
        "chat": "https://api.twitch.tv/kraken/chat/esl_sc2",
        "subscriptions": "https://api.twitch.tv/kraken/channels/esl_sc2/subscriptions",
        "editors": "https://api.twitch.tv/kraken/channels/esl_sc2/editors",
        "teams": "https://api.twitch.tv/kraken/channels/esl_sc2/teams",
        "videos": "https://api.twitch.tv/kraken/channels/esl_sc2/videos"
      }
    },
    "_links": {
      "self": "https://api.twitch.tv/kraken/streams/esl_sc2",
      "channel": "https://api.twitch.tv/kraken/channels/esl_sc2"
    }
  },
  {
    "stream": null,
    "display_name": "noobs2ninjas",
    "_links": {
      "self": "https://api.twitch.tv/kraken/streams/esl_sc2",
      "channel": "https://api.twitch.tv/kraken/channels/esl_sc2"
    }
  },
  {
    "error": "Not Found",
    "status": 404,
    "message": "Channel 'not-a-valid-account' does not exist"
  }
];

/*
console.log(twitchData);
//Loop over entries and save useful data
var logos = [];

for (var i=0; i< twitchData.length; i++) {
  if(twitchData[i].stream !== null && twitchData[i].status !== 404) {
  console.log(twitchData[i]);
  logos.push(twitchData[i].stream.logo);
  } else if (twitchData[i].status !== 404) {
    //LATER SAVE AS OFFLINE
  }
}

$("body").add( "<span>Again</span>").appendTo( document.body);

$("#test").attr("src", logos[0]);
console.log(logos);
*/

//Loop over entries and save useful data
var combined = [];

for (var i=0; i< twitchData.length; i++) {
  if(twitchData[i].status !== 404) {
    if(twitchData[i].stream !== null) {
     combined.push({"url":twitchData[i].stream.url,
                   "status":"online",
                   "logo":twitchData[i].stream.logo,
              "channel":twitchData[i].stream.display_name,
                    "program":twitchData[i].stream.status
                   });
    } else {
      combined.push({"status":"offline",
                   "channel":twitchData[i].display_name
                   });
    }
  } 
}

//console.log(combined);
//NEED TO SORT THIS
function compare(a,b) {
  if (a.status > b.status)
    return -1;
  if (a.status < b.status)
    return 1;
  return 0;
}

combined.sort(compare);

console.log(combined);
//APPEND THESE TO DOM
for (var i=0; i< combined.length; i++) {
  if (combined[i].status == "online") {
      //$('#first-col').append('<div class="same-height"><img src="' + combined[i].logo + '" class="img-responsive img-circle" alt="Error"></div>');
    $('#first-col').append('<div class="same-height"><img src="' + combined[i].logo + '" class="img-responsive img-thumbs img-circle" alt="Error"></div>');

      $('#second-col').append('<div class="same-height"><a href="' + combined[i].url + '">'+combined[i].channel+'</a></div>');

      $('#third-col').append('<div class="same-height"><p>' + combined[i].program +'</p></div>');
      } else {
        $('#first-col').append('<div class="same-height"><img src="https://sanespaces.com/core/wp-content/uploads/2012/05/placeholder.jpg" class="img-responsive img-circle img-thumbs" alt="Error"></div>');

      $('#second-col').append('<div class="same-height"><p>' + combined[i].channel+'</p></div>');

      $('#third-col').append('<div class="same-height"><p>' + combined[i].status +'</p></div>');
      }
}


/*BACKUP
$('#first-col').append('<img src="' + combined[0].logo + '" class="img-responsive img-circle" alt="Error">');

$('#second-col').append('<a href="' + combined[0].url + '">'+combined[0].channel+'</a>');

$('#third-col').append('<p>' + combined[0].program +'</p>');
*/