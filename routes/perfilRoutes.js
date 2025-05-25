const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const isLoggedIn = require('../controllers/IsLoggedIn.js');
router.use(express.static('public'));

router.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const user = req.cookies.username; 
    const ext = path.extname(file.originalname);
    cb(null, `${user}${ext}`);
  }
});
const upload = multer({ storage });


router.post('/upload', isLoggedIn, upload.single('profileImage'), (req, res) => {
  const user = req.cookies.username; 
  const ext = path.extname(req.file.originalname);
  res.json({ imageUrl: `/uploads/${user}${ext}` });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});
module.exports = router;

