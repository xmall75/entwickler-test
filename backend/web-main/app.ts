import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from '../infrastructure/models';
import pegawaiRouter from './routers/pegawai.router';
import jabatanRouter from './routers/jabatan.router';
import unitKerjaRouter from './routers/unitKerja.router';
import tempatTugasRouter from './routers/tempatTugas.router';

dotenv.config();

// Create an instance of express
const app = express();

app.use(cors());

// Parse JSON and url-encoded query
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize database
db.sequelize
  .sync()
  .then(() => console.log('Database connected'))
  .catch((err: object) => console.log('Error syncing tables: ', err));

// Define routes
app.use('/api/pegawai', pegawaiRouter);
app.use('/api/jabatan', jabatanRouter);
app.use('/api/unit-kerja', unitKerjaRouter);
app.use('/api/tempat-tugas', tempatTugasRouter);

// Set the port
const PORT = process.env.PORT;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
