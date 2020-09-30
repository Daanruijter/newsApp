let express = require("express");
const router = express.Router();
console.log("WORLDNEWSURLSROUTE");

router.get("/", (req, res) => {
  console.log("get works");
  const data = 6;
  res.send(data);
});

module.exports = router;
