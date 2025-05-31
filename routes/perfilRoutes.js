import express from 'express';
import multer from 'multer';
import path from 'path';
import isLoggedIn from '../controllers/IsLoggedIn.js';
import sharp from 'sharp';
import fs from 'fs/promises';
const router = express.Router();
router.use(express.static('public'));
router.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const user = req.cookies.username;
    const ext = path.extname(file.originalname);
    cb(null, `${user}-temp${ext}`); 
  }
});
const upload = multer({ storage });

router.post('/upload', isLoggedIn, upload.single('profileImage'), async (req, res) => {
  const user = req.cookies.username;
  const inputPath = req.file.path;
  const outputPath = path.join('uploads', `${user}.png`);

  await sharp(inputPath)
    .png()
    .toFile(outputPath);


  try {
    await fs.unlink(inputPath);
  } catch (err) {
    console.error('Erro ao remover arquivo temporário:', err);
  }

  res.json({ imageUrl: `/uploads/${user}.png` });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.clearCookie("username");
  res.redirect("/principal");
});

export default router;

