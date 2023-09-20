import express from 'express';
import { getAllEmployees, createEmployee, deleteEmployee, updateEmployee } from '../db/employee.js';
import EmployeeNotFoundError from '../exception/EmployeeNotFoundError.js';
import EmployeeInvalidError from '../exception/EmployeeInvalidError.js';

const employeeRouter = express.Router();

/**
 * Get a list of all employees
 */
employeeRouter.get('/', (req, res) => {
  getAllEmployees()
    .then(employees => res.json(employees))
    .catch(() => res.sendStatus(500))
});

/**
 * Add a given employee, return the created employee with an ID
 */
employeeRouter.post('/', async (req, res) => {
  createEmployee(req.body)
    .then(created => res.json(created))
    .catch(err => {
      if (err instanceof EmployeeInvalidError) {
        res.status(400).send("Invalid field on Employee");
      } else {
        res.sendStatus(500)
      }
    });
});

/**
 * Delete an employee with a given id
 */
employeeRouter.delete('/:id', (req, res) => {
  deleteEmployee(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => {
      if (err instanceof EmployeeNotFoundError) {
        res.status(404).send("Employee not found");
      } else {
        res.sendStatus(500);
      }
    })
});

/**
 * Updates an employee with the given info, if they exist
 */
employeeRouter.put('/:id', (req, res) => {
  updateEmployee(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(err => {
      if (err instanceof EmployeeInvalidError) {
        res.status(400).send("Invalid field on Employee");
      } else if (err instanceof EmployeeNotFoundError) {
        res.status(404).send("Employee not found");
      } else {
        res.sendStatus(500);
      }
    })
});

export default employeeRouter;
