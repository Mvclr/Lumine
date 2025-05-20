const express = require("express");
const loginRoutes = require("./routes/loginRoutes");
const principalRoutes = require("./routes/principalRoutes");
const cadastroRoutes = require("./routes/registerRoutes");


const router = express.Router();

router.use(loginRoutes);
router.use(principalRoutes);
router.use(cadastroRoutes);



module.exports = router;
