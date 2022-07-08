import 'dotenv/config';
import express from 'express';
import dashBoardRouter from './routes/dashboard.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use('/', (req, res, next) => {
  req.user = {
    clienteId: '3a81981b-e56d-4394-a3e6-f47c8d973ac7'
  };
  next();
});

app.use('/dashboard', dashBoardRouter);

app.use('/', (req, res) => {
  return res.send('ONLINE');
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
