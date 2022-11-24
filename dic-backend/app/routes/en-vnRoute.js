const express = require("express");
const eng = require("../controllers/en-vnController");

const en_vnRouter = express.Router();

en_vnRouter.route("/")
    .get(eng.findAll)
    .post(eng.create)
    .delete(eng.deleteAll);

en_vnRouter.route("/:id")
    .get(eng.findOne)
    .put(eng.update)
    .delete(eng.delete);

module.exports = en_vnRouter;