import express from "express";
import loginRoutes from "./routes/loginRoutes.js";
import principalRoutes from "./routes/principalRoutes.js";
import cadastroRoutes from "./routes/registerRoutes.js";
import perfilRoutes from "./routes/perfilRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import searchRoutes from "./routes/searchRoutes.js"
const router = express.Router();

router.use(loginRoutes);
router.use(principalRoutes);
router.use(cadastroRoutes);
router.use(perfilRoutes)
router.use(movieRoutes)
router.use(categoryRoutes);
router.use(searchRoutes)


export default router;
