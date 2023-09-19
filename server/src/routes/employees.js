const express = require('express');
const router = express.Router();

/**
 * Get a list of all employees
 */
router.get('/', (req, res) => {
  res.send("Get");
});

/**
 * Add a given employee
 */
router.post('/', (req, res) => {
  res.send(`Post ${JSON.stringify(req.body)}`);
});

/**
 * Delete an employee with a given id
 */
router.delete('/:id', (req, res) => {
  res.send(`Delete ${req.params.id}`);
})

/**
 * Updates an employee with the given info, if they exist
 */
router.put('/', (req, res) => {
  res.send(`Put ${JSON.stringify(req.body)}`);
})

module.exports = router;
