const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

router.use(express.static('public'));
router.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, 'profile.png');
  }
});
const upload = multer({ storage });


router.post('/upload', upload.single('profileImage'), (req, res) => {
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});
module.exports = router;

