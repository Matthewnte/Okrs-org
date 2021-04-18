const Pusher = require('pusher');
const config = require('../../config');

const pusher = new Pusher({
  appId: config.pusher.appId,
  key: config.pusher.key,
  secret: config.pusher.secret,
  cluster: config.pusher.cluster,
});

// function pusher(channel, event, data, socket) {
//   return pusher.trigger(channel, event, data, socket);
// }

module.exports = pusher;
