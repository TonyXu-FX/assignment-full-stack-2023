import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './App.css';

const data = [
  {
    "_id": 1,
    "firstName": "Lewis",
    "lastName": "Burson",
    "salary": 40700
  },
  {
    "_id": 2,
    "firstName": "Ian",
    "lastName": "Malcolm",
    "salary": 70000
  },
  {
    "_id": 3,
    "firstName": "Ellie",
    "lastName": "Sattler",
    "salary": 102000
  },
  {
    "_id": 4,
    "firstName": "Dennis",
    "lastName": "Nedry",
    "salary": 52000
  },
  {
    "_id": 5,
    "firstName": "John",
    "lastName": "Hammond",
    "salary": 89600
  },
  {
    "_id": 6,
    "firstName": "Ray",
    "lastName": "Arnold",
    "salary": 45000
  },
  {
    "_id": 7,
    "firstName": "Laura",
    "lastName": "Burnett",
    "salary": 80000
  }
];

const EmployeeTable = ({ employees }) => {
  const mapEmployeeToRow = (employee) => (
    <tr key={employee._id}>
      <td>{employee.firstName}</td>
      <td>{employee.lastName}</td>
      <td>{employee.salary}</td>
      <td>
        <Button>Edit</Button>
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
        {employees.map(employee => mapEmployeeToRow(employee))}
      </tbody>
    </Table>
  )
}

function App() {
  return (
    <div className="App">
      <EmployeeTable employees={data} />
    </div>
  );
}

export default App;
