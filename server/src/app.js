import express from 'express';
import employeeRouter from './routes/employees.js';

const app = express();
app.use(express.json());

app.use('/api/employee', employeeRouter);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
