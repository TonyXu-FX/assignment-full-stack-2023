class EmployeeNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "EmployeeNotFoundError";
  }
}

export default EmployeeNotFoundError;
