const express = require("express");
const path = require("path");
const { verifyJWT } = require("../controllers/jwtController.js");
const connection = require("../db/db_server.js");
const isLoggedIn = require("../controllers/IsLoggedIn.js");
const router = express.Router();


router.use(express.static(path.join(__dirname, "../public")));

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "index.html"));
});

router.get("/principal", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "principal.html"));
});

router.get("/api/IsLoggedIn", isLoggedIn, (req, res) => {
  return res.status(200).json({ loggedIn: true, user: req.user });
});

module.exports = router;