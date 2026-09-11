const express = require("express");
const { getData, getOptions } = require("../controllers/dataController");

const router = express.Router();

router.get("/", getData);
router.get("/options", getOptions);

module.exports = router;
