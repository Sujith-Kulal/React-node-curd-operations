import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({ code: "", name: "", designation: "" });
  const [addEmployee, setAddEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  //  Keep only one handleDelete function
  const handleDelete = async (code) => {
    try {
      await axios.delete(`http://localhost:5000/employees/${code}`);
      
      // Only remove the selected employee from the state
      setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.code !== code));
      
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

 
  
  
  

  //  Keep only one handleEdit function
  const handleEdit = (employee) => {
    setEditingEmployee(employee.code);
    setFormData(employee);
    setAddEmployee("Edit");
  };

  //  Keep only one handleSave function
  const handleSave = async () => {
    try {
      if (addEmployee === "Edit") {
        await axios.put(`http://localhost:5000/employees/${formData.id}`, formData);
      } else {
        await axios.post("http://localhost:5000/employees", formData);
      }
      setEditingEmployee(null);
      setFormData({ code: "", name: "", designation: "" });
      fetchEmployees();
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  //  Keep only one handleCancel function
  const handleCancel = () => {
    setEditingEmployee(null);
    setAddEmployee(null);
    setFormData({ code: "", name: "", designation: "" });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Employee Table</h2>
      <button
        className="btn btn-success mb-3"
        onClick={() => {
          setEditingEmployee(null);
          setAddEmployee("Add");
        }}
      >
        Add Employee
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Employee Code</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.code}>
              <td>{employee.code}</td>
              <td>{employee.name}</td>
              <td>{employee.designation}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(employee)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(employee.code)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {addEmployee && (
        <div className="mt-4">
          <h4>{addEmployee === "Edit" ? "Edit Employee" : "Add Employee"}</h4>
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Name"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="Code"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              placeholder="Designation"
            />
          </div>
          <button className="btn btn-primary me-3" onClick={handleSave}>
            {addEmployee === "Add" ? "Add" : "Save"}
          </button>
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
