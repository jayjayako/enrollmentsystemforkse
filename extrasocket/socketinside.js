const client = require("../modulelibrary/importredisio");

var { sendmessage } = require("./messages");

async function socketfunct(socket) {
  if (socket.request.session.authenticated == true) {
    client.hmset(socket.request.session.userid, {
      servername: "server1-channel",
      socketid: socket.id,
      conn: "connected",
    });
  }
  /////////////// function for user logout //////////////
  async function autologout(socketid) {
    ////////////////////// for user 1 ///////////////////
    const socketidresult = await client.hget(
      socket.request.session.userid,
      "socketid"
    );
    if (socketidresult) {
      if (socketid == socketidresult) {
        client.del(socket.request.session.userid);
        socket.request.session.destroy();
        console.log("User Logged Out");
      }
    }
    /////////////////////////////////////////////////////
    return;
  }
  //////////////////////////////////////////////////////
  ////////////////////////// import messages /////////////////////////////
  sendmessage(socket);
  ////////////////////////////////////////////////////////////////////////

  socket.on("disconnect", () => {
    console.log("Disconnected: socket " + socket.id);
    client.hmset(socket.request.session.userid, {
      servername: "server1-channel",
      socketid: socket.id,
      conn: "disconnected",
    });
    setTimeout(autologout, 5000, socket.id);
    socket.disconnect(true);
  });
}

module.exports = {
  socketfunct: socketfunct,
};
