const express = require("express");
const fra = require("../controllers/fr-vnController");

const fr_vnRouter = express.Router();

fr_vnRouter.route("/")
    .get(fra.findAll)
    .post(fra.create)
    .delete(fra.deleteAll);

fr_vnRouter.route("/:id")
    .get(fra.findOne)
    .put(fra.update)
    .delete(fra.delete);

module.exports = fr_vnRouter;