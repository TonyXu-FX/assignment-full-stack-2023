import express from 'express';
import dotenv from 'dotenv';
import employeeRouter from './routes/employees.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use('/api/employee', employeeRouter);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
