const express = require("express");
const path = require("path");
const { verifyJWT } = require("../controllers/jwtController.js");
const connection = require("../db/db_server.js");

const router = express.Router();

router.use(express.static(path.join(__dirname, "../public")));

router.get("/", verifyJWT, (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "index.html"));
});

router.get("/principal", verifyJWT, (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "principal.html"));
});


module.exports = router;