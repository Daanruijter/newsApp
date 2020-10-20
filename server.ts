// Server.js
const mongoose = require("mongoose");
let express = require("express");
var path = require("path");
var serveStatic = require("serve-static");
const app = express();
const cors = require("cors");
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(serveStatic(__dirname + "/dist"));
}

if (process.env.NODE_ENV === "development") {
  app.use(serveStatic(__dirname + "/worldnews-app"));
}

var port = process.env.PORT || 5000;

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(function(req, res, next) {
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

app.use("/", require("./worldNewsUrls.ts"));
