const socket = io("/");

socket.on("socket-message", (data) => {
  appendMessage(data.messagetype);
});

function appendMessage(message) {
  console.log(message);
}

socket.emit("socketconnect", {
  mobileid: "none",
  type: "webtoweb",
  destination: "server",
  messagetype: "connection",
});
