let express = require("express");
const router = express.Router();
console.log("WORLDNEWSURLSROUTE");
const fetch = require("node-fetch");

router.get("/", (req, res) => {
  console.log("get works");

  fetch(
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=771f495b60b94bfabf9a9800d4996456",

    {
      method: "GET",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  )
    .then((response) => {
      return response.json();
    })

    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      return res.json({ succes: false, err });
    });
});

module.exports = router;
