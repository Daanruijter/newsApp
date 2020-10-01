const expressServer = require("express");
const router = expressServer.Router();

const fetchMethod = require("node-fetch");

router.post("/", (req, res) => {
  const url = req.body.fetchUrl;

  //fetch the data from the NewsAPI based on the user query that comes from the front-end
  fetchMethod(
    url,

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
      res.send(data);
    })
    .catch((err) => {
      return res.json({ succes: false, err });
    });
});

module.exports = router;
