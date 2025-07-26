import express from 'express';
import cors from 'cors';
import employeeRoutes from './routes/employeeRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use('/employees', employeeRoutes);

app.get('/', (_req, res) => {
  res.send('Employee Info API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 