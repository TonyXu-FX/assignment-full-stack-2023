import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  }
});

const Employee = mongoose.model('employee', EmployeeSchema);
export default Employee;