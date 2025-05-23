const express = require("express");
const loginRoutes = require("./routes/loginRoutes");
const principalRoutes = require("./routes/principalRoutes");
const cadastroRoutes = require("./routes/registerRoutes");
const perfilRoutes = require("./routes/perfilRoutes");

const router = express.Router();

router.use(loginRoutes);
router.use(principalRoutes);
router.use(cadastroRoutes);
router.use(perfilRoutes)


module.exports = router;
