/**
 * Check if all fields of the employee object are present and valid
 */
export const isEmployeeValid = (employee) => {
  return employee.firstName 
      && employee.lastName 
      && employee.salary != undefined
      && employee.salary >= 0;
}