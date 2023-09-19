import express from 'express';
const employeeRouter = express.Router();

/**
 * Get a list of all employees
 */
employeeRouter.get('/', (req, res) => {
  res.send("Get");
});

/**
 * Add a given employee
 */
employeeRouter.post('/', (req, res) => {
  res.send(`Post ${JSON.stringify(req.body)}`);
});

/**
 * Delete an employee with a given id
 */
employeeRouter.delete('/:id', (req, res) => {
  res.send(`Delete ${req.params.id}`);
});

/**
 * Updates an employee with the given info, if they exist
 */
employeeRouter.put('/', (req, res) => {
  res.send(`Put ${JSON.stringify(req.body)}`);
});

export default employeeRouter;
