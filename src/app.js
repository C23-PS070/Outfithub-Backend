const express = require('express');
const app = express();
const { Sequelize } = require('sequelize');
const config = require('./config/config');
const { User } = require('./models/user');
const authRoutes = require('./routes/auth');

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Mengambil credential Service Account dari file
const serviceAccountKey = require('./project-capstone.json');

// Inisialisasi database
(async () => {
  try {
    const sequelize = new Sequelize({
      dialect: 'mysql',
      dialectOptions: {
        ssl: {
          ca: serviceAccountKey.client_email,
        },
      },
      // username: config.db.username,
      // password: config.db.password,
      // database: config.db.database,
      // host: config.db.host,
    });

    // Test koneksi database
    await sequelize.authenticate();
    console.log('Koneksi database berhasil.');

    // Sinkronisasi model dengan tabel di database
    await sequelize.sync();
    console.log('Sinkronisasi model dengan tabel berhasil.');

    // Cek jika tabel pengguna kosong, tambahkan pengguna awal
    const usersCount = await User.count();
    if (usersCount === 0) {
      await User.create({
        nama: 'Admin',
        email: 'admin@example.com',
        password: 'admin123',
      });
      console.log('Pengguna awal ditambahkan.');
    }
  } catch (error) {
    console.error('Gagal koneksi database:', error);
  }
})();

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
