const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const authMiddleware = require('../middleware/authMiddleware');

// Endpoint register
router.post('/register', async (req, res) => {
  try {
    const { nama, email, password, confirmPassword } = req.body;

    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email sudah terdaftar' });
    }

    // Cek apakah password sama dengan confirmPassword
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password dan konfirmasi password tidak cocok' });
    }

    // Simpan data pengguna ke database
    const user = await User.create({ nama, email, password });

    res.status(201).json({ message: 'Pendaftaran berhasil' });
  } catch (error) {
    console.error('Gagal mendaftar:', error);
    res.status(500).json({ message: 'Gagal mendaftar' });
  }
});

// Endpoint login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cari pengguna berdasarkan email
    const user = await User.findOne({ where: { email } });

    if (user) {
      // Verifikasi password menggunakan bcrypt
      const isPasswordValid = await user.comparePassword(password);

      if (isPasswordValid) {
        // Buat token JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

        res.status(200).json({ message: 'Login berhasil', token });
      } else {
        res.status(401).json({ message: 'Kombinasi email dan password tidak valid' });
      }
    } else {
      res.status(401).json({ message: 'Kombinasi email dan password tidak valid' });
    }
  } catch (error) {
    console.error('Gagal login:', error);
    res.status(500).json({ message: 'Gagal login' });
  }
});

// Endpoint logout
router.post('/logout', authMiddleware, async (req, res) => {
  try {
    // Menghapus token JWT dari client-side (misalnya dengan mengatur cookie/token menjadi tidak valid)
    // Di sini, kita hanya akan memberikan respons berhasil tanpa tindakan khusus

    res.status(200).json({ message: 'Logout berhasil' });
  } catch (error) {
    console.error('Gagal logout:', error);
    res.status(500).json({ message: 'Gagal logout' });
  }
});

module.exports = router;
