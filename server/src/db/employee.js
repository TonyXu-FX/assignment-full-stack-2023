import Employee from '../models/Employee.js';

/**
 * Add given employee to the db, return created employee with ID
 */
export const createEmployee = async (employee) => {
    const created = await Employee.create(employee);
    return created;
}