import Employee from '../models/Employee.js';
import EmployeeNotFoundError from '../exception/EmployeeNotFoundError.js';
import EmployeeInvalidError from '../exception/EmployeeInvalidError.js';

/**
 * Return all employees from DB
 */
export const getAllEmployees = () => Employee.find();

/**
 * Add given employee to the db, return created employee with ID
 */
export const createEmployee = async (employee) => {
  if (!isEmployeeValid(employee)) {
    throw new EmployeeInvalidError();
  }

  const created = await Employee.create(employee);
  return created;
}
/**
 * Delete employee based on the id;
 */
export const deleteEmployee = async (id) => {
  if (!(await doesEmployeeExist(id))) {
    throw new EmployeeNotFoundError();
  }

  return Employee.findByIdAndRemove(id);
}

/**
 * Update an employee with the given info if they exist
 */
export const updateEmployee = async (id, employee) => {
  if (!(await doesEmployeeExist(id))) {
    throw new EmployeeNotFoundError();
  } else if (!isEmployeeValid(employee)) {
    throw new EmployeeInvalidError();
  }

  return Employee.findByIdAndUpdate(id, employee);
}

/**
 * Attempts to find employee by id, returns whether they exist
 */
const doesEmployeeExist = async (id) => {
  const employee = await Employee.findById(id);
  return !!employee;
}

/**
 * Check if all fields of the employee object are present and valid
 */
const isEmployeeValid = (employee) => {
  return employee.firstName 
      && employee.lastName 
      && employee.salary != undefined
      && employee.salary >= 0;
}
