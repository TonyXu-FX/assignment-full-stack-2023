const express = require('express');

const app = express();
app.use(express.json());

const employees = require('./routes/employees');
app.use('/api/employees', employees);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
