import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputDialog from './components/Dialogue/InputDialog';
import './App.css';
import { getEmployees } from './helpers/api';

const EmployeeTable = ({ 
  employees,
  setCurrentEmp,
  setDialogVisible
}) => {
  const onEdit = (index) => {
    const editedEmp = employees[index];
    setCurrentEmp(editedEmp)
    setDialogVisible(true)
  }

  const mapEmployeeToRow = (employee, index) => (
    <tr key={employee._id}>
      <td>{employee.firstName}</td>
      <td>{employee.lastName}</td>
      <td>{employee.salary}</td>
      <td>
        <Button onClick={() => onEdit(index)}>Edit</Button>
        <Button>Delete</Button>
      </td>
    </tr>
  );

  return (
    <Table border={1}>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Salary</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => mapEmployeeToRow(employee, index))}
      </tbody>
    </Table>
  )
}

const EmployeeForm = ({ 
  dialogVisible,
  setDialogVisible,
  currentEmp,
  setCurrentEmp,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [salary, setSalary] = useState(0);

  useEffect(() => {
    if (currentEmp != null) {
      setFirstName(currentEmp.firstName);
      setLastName(currentEmp.lastName);
      setSalary(currentEmp.salary);
    }
  }, [currentEmp])

  const handleClose = () => {
    setDialogVisible(false);
    setCurrentEmp(null);
    setFirstName("");
    setLastName("");
    setSalary("");
  }

  const handleSubmit = () => {
    if (currentEmp != null) {
      console.log(firstName);
      console.log(lastName);
      console.log(salary);
      handleClose();
    }
  }

  return (
    <InputDialog
      visible={dialogVisible}
      title={currentEmp != null ? "Edit Employee" : "Add Employee"}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
    >
      <Form>
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control onChange={e => setFirstName(e.target.value)} value={firstName} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control onChange={e => setLastName(e.target.value)} value={lastName} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="salary">
          <Form.Label>Salary</Form.Label>
          <Form.Control onChange={e => setSalary(e.target.value)} value={salary} />
        </Form.Group>
      </Form>
    </InputDialog>
  );
}

function App() {
  const [employees, setEmployees] = useState([]);
  
  const [dialogVisible, setDialogVisible] = useState(false);
  const [currentEmp, setCurrentEmp] = useState(null);

  useEffect(() => {
    getEmployees()
      .then(emps => setEmployees(emps))
      .catch(err => console.log(err));
  }, [])

  return (
    <div className="App">
      <EmployeeTable
        employees={employees}
        setCurrentEmp={setCurrentEmp}
        setDialogVisible={setDialogVisible}
      />
      <EmployeeForm
        dialogVisible={dialogVisible}
        setDialogVisible={setDialogVisible}
        currentEmp={currentEmp}
        setCurrentEmp={setCurrentEmp}
      />
    </div>
  );
}

export default App;
