# COLOCA ISSO AI OU FAZ ALGO PARECIDO, É O CODIGO PRA UPLOAD DA IMAGEM DE PERFIL, N COLOQUEI PRA N BAGUNÇAR NADA.

<!-- const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, 'profile.png');
  }
});
const upload = multer({ storage });

// Rota de upload
app.post('/upload', upload.single('profileImage'), (req, res) => {
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); -->

