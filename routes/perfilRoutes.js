import express from 'express';
import multer from 'multer';
import path from 'path';
import isLoggedIn from '../controllers/IsLoggedIn.js';

const router = express.Router();
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
  res.clearCookie("username");
  res.redirect("/principal");
});

export default router;

