const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Change this if using a different username
  password: "", // Add your MySQL password if applicable
  database: "company_db", // Ensure this database exists
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Database connection failed: ", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Get all employees
app.get("/employees", (req, res) => {
  const query = "SELECT id, code, name, designation FROM employee";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching employees: ", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(results);
    }
  });
});

// Add an employee
app.post("/employees", (req, res) => {
    const { code, name, designation } = req.body;
    const query = "INSERT INTO employee (code, name, designation) VALUES (?, ?, ?)";
    db.query(query, [code, name, designation], (err, result) => {
      if (err) {
        console.error("Error adding employee: ", err);
        res.status(500).json({ error: "Database error" });
      } else {
        res.json({ message: "Employee added successfully", id: result.insertId });
      }
    });
  });
  
  // Update an employee
  app.put("/employees/:id", (req, res) => {
    const { id } = req.params;
    const { code, name, designation } = req.body;
    const query = "UPDATE employee SET code = ?, name = ?, designation = ? WHERE id = ?";
    db.query(query, [code, name, designation, id], (err, result) => {
      if (err) {
        console.error("Error updating employee: ", err);
        res.status(500).json({ error: "Database error" });
      } else {
        res.json({ message: "Employee updated successfully" });
      }
    });
  });
  
  // Delete an employee
  app.delete("/employees/:code", (req, res) => {
    const { code } = req.params;
    const query = "DELETE FROM employee WHERE code = ?";
    db.query(query, [code], (err, result) => {
      if (err) {
        console.error("Error deleting employee: ", err);
        res.status(500).json({ error: "Database error" });
      } else {
        res.json({ message: "Employee deleted successfully" });
      }
    });
  });




const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
