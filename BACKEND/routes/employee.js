
// This route implementation was adapted from GeeksforGeeks
// https://www.geeksforgeeks.org/express-js-express-router-function/
// gouravhammad
// https://www.geeksforgeeks.org/user/gouravhammad/contributions/?itm_source=geeksforgeeks&itm_medium=article_author&itm_campaign=auth_user

const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');
const { authMiddleware } = require('../middleware/authMiddleware');

// Employee pre-registration route
router.post('/pre-register', async (req, res) => {
    try {
        const { fullName, employeeId, username, password } = req.body;

        // Check if the employee already exists
        const existingEmployee = await Employee.findOne({ username });
        if (existingEmployee) {
            return res.status(400).json({ message: "Employee with this username already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new employee
        const newEmployee = new Employee({
            fullName,
            employeeId,
            username,
            password: hashedPassword
        });

        await newEmployee.save();
        res.status(201).json({ message: "Employee registered successfully" });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
});

// Employee login route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the employee by username
        const employee = await Employee.findOne({ username });
        if (!employee) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, employee.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Generate a token
        const token = jwt.sign({ id: employee._id, role: employee.role }, process.env.JWT_SEC, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
});

// Protecting routes with auth middleware (if needed in the future)
// router.use(authMiddleware);

module.exports = router;

