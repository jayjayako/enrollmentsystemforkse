var { socketconn } = require("../socketconnect");
var { socketdissconn } = require("../socketdisconnect");
var { socketmessage } = require("../socketmessage/index.js");
function socketfunct(io) {
  io.on("connection", (socket) => {
    socketconn(socket, socketmessage, io);
    socketdissconn(socket, socketmessage, io);
  });
}

module.exports = {
  socketfunct: socketfunct,
};
