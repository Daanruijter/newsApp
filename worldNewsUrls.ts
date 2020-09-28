// const express = require("express");
const router = express.Router();
console.log("WORLDNEWSURLSROUTE");

//get the current user with the token

router.get("/", (req, res) => {
  console.log("get works");
});

module.exports = router;
