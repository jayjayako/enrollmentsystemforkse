const db = require("../../modulelibrary/databaseconn");
var xss = require("xss");

function socketmessage(socket, datatype, datadest, msgtype, recieversocketid) {
  console.log("user message connected");
  if (datatype == "webtoweb") {
    var msgtypefiltered = xss(msgtype);
    console.log(datatype);
    console.log(datadest);
    console.log(msgtypefiltered);
    socket.to(recieversocketid).emit("socket-message", {
      messagetype: msgtypefiltered,
    });
  }

  if (datatype == "webtomobile") {
    var msgtypefiltered = xss(msgtype);
    console.log(datatype);
    console.log(datadest);
    console.log(msgtypefiltered);
    socket.to(recieversocketid).emit("socket-message", {
      messagetype: msgtypefiltered,
    });
  }

  if (datatype == "mobiletoweb") {
    var msgtypefiltered = xss(msgtype);
    console.log(datatype);
    console.log(datadest);
    console.log(msgtypefiltered);
    socket.to(recieversocketid).emit("socket-message", {
      messagetype: msgtypefiltered,
    });
  }
}

module.exports = {
  socketmessage: socketmessage,
};
