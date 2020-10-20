console.log("server.js executes");

// server.js
const mongoose = require("mongoose");
let express = require("express");
var path = require("path");
var serveStatic = require("serve-static");
const app = express();
const cors = require("cors");
app.use(cors());
if (process.env.NODE_ENV === "production") {
  console.log("development");
  app.use(serveStatic(__dirname + "/dist"));
}

if (process.env.NODE_ENV === "development") {
  app.use(serveStatic(__dirname + "/worldnews-app"));
}
// app.use(
//   "/robots.txt",
//   express.static(path.join(__dirname, "dist/static/robots.txt"))
// );
// app.use(
//   "/sitemap.xml",
//   express.static(path.join(__dirname, "dist/static/sitemap.xml"))
// );

var port = process.env.PORT || 5000;

const bodyParser = require("body-parser");

// const db = config.get("mongoURI");
app.use(bodyParser.json());

// app.get("/s", (req, res) => {
//   res.json({
//     message: "Behold The MEVN Stack!",
//   });
// });
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(function(req, res, next) {
  console.log("ACCESS COsNTORL ");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});

const db =
  "mongodb+srv://dr:sSXGDQnstqEWcLHx@cluster0-4ie2c.mongodb.net/test?retryWrites=true&w=majority";

mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    dbName: "bookstore-app",
  })
  .then(() => console.log("Connection to Mongo DB established"))
  .catch((err) => console.log(err + "There is no connection"));

mongoose.set("debug", true);
app.get("/", function() {
  console.log("sitemap function execyuted");
  // res.sendFile(path.join(__dirname + "/dist/static/sitemap.xml"));
});
app.use("/", require("./worldNewsUrls.ts"));
