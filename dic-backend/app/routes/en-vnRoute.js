const express = require("express");
const word = require("../controllers/en-vnController");

const router = express.Router();

router.route("/")
    .get(word.findAll)
    .post(word.create)
    .delete(word.deleteAll);

module.exports = router;