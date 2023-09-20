import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputDialog from './components/Dialogue/InputDialog';
import './App.css';
import { addEmployee, editEmployee, getEmployees } from './helpers/api';

const EmployeeTable = ({ 
  employees,
  setCurrentEmp,
  setCurrEmpIndex,
  setDialogVisible
}) => {
  const onEdit = (index) => {
    const editedEmp = employees[index];
    setCurrEmpIndex(index);
    setCurrentEmp(editedEmp);
    setDialogVisible(true);
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
  onSuccess,
  onFailure,
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
    const newEmp = {
      firstName: firstName,
      lastName: lastName,
      salary: salary,
      _id: currentEmp ? currentEmp._id : undefined
    }
    if (currentEmp != null) {
      editEmployee(newEmp).then(() => onSuccess(newEmp)).catch(onFailure);
    } else {
      addEmployee(newEmp).then(res => onSuccess(res.data)).catch(onFailure);
    }
    handleClose();
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
  const [currEmpIndex, setCurrEmpIndex] = useState(-1);

  const onAddEmployee = () => {
    setCurrEmpIndex(-1);
    setCurrentEmp(null);
    setDialogVisible(true);
  }

  const onSubmitSuccess = (newEmp) => {
    if (currentEmp != null) {
      setEmployees(employees.map((emp, index) => {
        if (index === currEmpIndex)
          return newEmp;
        return emp;
      }))
    } else {
      setEmployees([...employees, newEmp])
    }
  }

  const onSubmitFail = (err) => console.log(err);

  useEffect(() => {
    getEmployees()
      .then(emps => setEmployees(emps))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <EmployeeTable
        employees={employees}
        setCurrentEmp={setCurrentEmp}
        setDialogVisible={setDialogVisible}
        setCurrEmpIndex={setCurrEmpIndex}
      />
      <Button onClick={onAddEmployee}>Add Employee</Button>
      <EmployeeForm
        dialogVisible={dialogVisible}
        setDialogVisible={setDialogVisible}
        currentEmp={currentEmp}
        setCurrentEmp={setCurrentEmp}
        onSuccess={onSubmitSuccess}
        onFailure={onSubmitFail}
      />
    </div>
  );
}

export default App;
