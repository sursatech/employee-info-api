import express from 'express';
import cors from 'cors';
import employeeRoutes from './routes/employeeRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/employees', employeeRoutes);

// Debug endpoint to see what's being sent
app.post('/debug', (req, res) => {
  console.log('Debug - Full request:', {
    headers: req.headers,
    body: req.body,
    contentType: req.get('Content-Type')
  });
  res.json({
    message: 'Debug endpoint hit',
    received: req.body,
    headers: req.headers
  });
});

app.get('/', (_req, res) => {
  res.send('Employee Info API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 