const socket = io("/");

socket.on("socket-message", (data) => {
  appendMessage(data.messagetype);
});

function appendMessage(message) {
  console.log(message);
  // toastmessage();
  // //////////////// student notifications //////////////////
  // if (message == "reloadmobilenotifications") {
  //   getmessagenotif("getalldata");
  // }
  // ///////////////////////////////////////////////////////
  // /////////////////// student cashier ///////////////////
  // if (message == "reloadnotifications") {
  //   getmessagenotif("getalldata");
  // }
  // ///////////////////////////////////////////////////////
}

socket.emit("send-socket-message", {
  mobileid: "none",
  type: "webtoweb",
  destination: "server",
  messagetype: "connection",
});

// function sendrealtimemessage(msg) {
//   function reloadenrollmentreservation() {
//     socket.emit("send-socket-message", {
//       mobileid: "none",
//       type: "webtoweb",
//       destination: "registrar",
//       messagetype: "reloadenrollmentreservation",
//     });
//   }

//   function reloadadmission() {
//     socket.emit("send-socket-message", {
//       mobileid: "none",
//       type: "webtoweb",
//       destination: "Registrar",
//       messagetype: "reloadeditstudentrecordsnewstudent",
//     });
//   }

//   function reloadcashier() {
//     socket.emit("send-socket-message", {
//       mobileid: "none",
//       type: "webtoweb",
//       destination: "Cashier",
//       messagetype: "reloadverifypayment",
//     });
//   }

//   function reloadadmindepartment() {
//     socket.emit("send-socket-message", {
//       mobileid: "none",
//       type: "webtoweb",
//       destination: "Admin Department",
//       messagetype: "reloadadmindepartment",
//     });
//   }

//   function reloadbalance() {
//     socket.emit("send-socket-message", {
//       mobileid: "none",
//       type: "webtoweb",
//       destination: "Cashier",
//       messagetype: "reloadviewstudentbalance",
//     });
//   }

//   if (msg == "reloadenrollmentreservation") {
//     reloadenrollmentreservation();
//   }

//   if (msg == "reloadadmission") {
//     reloadadmission();
//   }

//   if (msg == "reloadverifypayment") {
//     reloadcashier();
//   }

//   if (msg == "reloadadmindepartment") {
//     reloadadmindepartment();
//   }

//   if (msg == "reloadviewstudentbalance") {
//     reloadbalance();
//   }
// }
