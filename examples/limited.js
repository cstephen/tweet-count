// Tally tweets at regular time intervals until a specified amount of time has
// passed, providing the end results to a callback function.
'use strict';

var conf = require('nconf');
var HashtagCount = require('../lib/hashtag-count');

// Log into your Twitter account and go here https://apps.twitter.com/ to
// generate keys for your application, then set them in config.json. Or you can
// hard-code them like this instead:
// var hc = new HashtagCount({
//   'consumer_key': '...',
//   'consumer_secret': '...',
//   'access_token': '...',
//   'access_token_secret': '...'
// });
conf.file({ file: '../config.json' });
var hc = new HashtagCount(conf.get());

// Array of hashtags to tally.
var hashtags = ['#superbowl', '#pizza', '#beer'];

// Hashtag tallies for each time interval will be added to the results object.
var interval = '30 seconds';

// Stop running after this amount of time has passed.
var limit = '5 minutes';

// Called after time limit has been reached it is set. The results object
// contains start-of-interval time stamps with each interval's hashtag tallies.
// For example:
// {
//   '2017-01-16T00:00:10.606Z': { '#superbowl': 6, '#pizza': 1, '#beer': 8 },
//   '2017-01-16T00:01:10.610Z': { '#superbowl': 7, '#pizza': 1, '#beer': 4 },
//   '2017-01-16T00:02:10.612Z': { '#superbowl': 3, '#pizza': 1, '#beer': 0 }
// }
var finishedCb = function (err, results) {
  if (err) {
    console.error(err);
  } else {
    console.log(results);
  }
};

// Open a connection to Twitter's Streaming API and start capturing tweets!
hc.start({
  hashtags: hashtags,       // required
  interval: interval,       // required
  limit: limit,             // optional
  finishedCb: finishedCb,   // optional
});
