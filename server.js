const express = require("express");
const app = express();
require("dotenv").config();
app.disable("x-powered-by");

const path = require("path");

var routes = require("./routes");
function getfilespath(req, res, next) {
  res.locals.absolutepath = __dirname;
  next();
}
app.use("/api", getfilespath, routes);

var server = require("http").createServer(app);

const port = process.env.PORT || 3000;

const cors = require("cors");

app.use(cors());

const cookieParser = require("cookie-parser");
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

server.listen(port, (err) => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Listening on port...${port}`);
});

const io = require("socket.io")(server, { cors: { origin: "*" } });

var { socketfunct } = require("./realtime/mainsocket");
socketfunct(io);

app.use(express.static("ui"));
app.use("/ui", express.static(__dirname + "ui"));

// app.get("/website", (req, res) => {
//   res.sendFile(path.join(__dirname, "ui/index.html"));
// });
