import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import employeeRouter from './routes/employeeRoute.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use(cors({ origin: true, credentials: true }));

app.use('/api/employees', employeeRouter);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
