const client = require("../modulelibrary/importredisio");
var xss = require("xss");
const { samplecron } = require("./cronjob");

async function sendmessage(socket) {
  // const pubClient = client.duplicate();
  // const subClient = client.duplicate();
  // const channel = "server2-channel"; // listens to server2 channel
  // subClient.subscribe(channel);
  // ///////////////// sample message ////////////////
  // socket.on("message", (message) => {
  //   console.log(message.message);
  //   socket.emit("chat-message", "from this server node 1");
  // });
  // /////////////////////////////////////////////////
  // //////////// listens to incoming messages from another server //////////
  // async function onMessage(channel, message) {
  //   console.log(
  //     `Received message socket ${socket.id}"${message}" on channel "${channel}"`
  //   );
  //   socket.to(message.socketid).emit("clientmessagerecieve", {
  //     message: message.message,
  //   });
  // }
  // subClient.on("message", onMessage);
  // ////////////////////////////////////////////////////////////////////////
  // //////////////////// get message and send to recievers /////////////////
  // socket.on("sendmessage", async (message) => {
  //   const socketidresult = await client.hget(message.useridnum, "socketid");
  //   const servernameresult = await client.hget(message.useridnum, "servername");
  //   if (message.scheduleid == "nosched") {
  //     if (servernameresult == "server2-channel") {
  //       pubClient.publish("server1-channel", {
  //         schedule: xss(message.scheduleid),
  //         userid: xss(message.useridnum),
  //         socketid: socketidresult,
  //         message: xss(message.usermsgid),
  //       });
  //     }
  //     if (servernameresult == "server1-channel") {
  //       socket.to(socketidresult).emit("clientmessagerecieve", {
  //         message: message.usermsgid,
  //       });
  //     }
  //   } else {
  //     let strsubscription = await client.hget(
  //       message.useridnum + "-notif",
  //       "strsubscription"
  //     );
  //     const datetime = new Date(Date.now() + 10000);
  //     samplecron(message.useridnum, datetime, strsubscription);
  //   }
  //   console.log(message.scheduleid, message.useridnum, message.usermsgid);
  // });
  // ////////////////////////////////////////////////////////////////////////
  // socket.on("disconnect", () => {
  //   /////////// remove subscriber client after disconnect ///////////
  //   subClient.removeListener("message", onMessage);
  //   // //////////////////////////////////////////////////////////////
  // });
}

module.exports = {
  sendmessage: sendmessage,
};
