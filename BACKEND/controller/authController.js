const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator');
const User = require('../models/User')

const register = async (req, res) => {
    // This method was adapted from dev
    // https://dev.to/alexmercedcoder/basic-authentication-with-node-express-and-mongo-1a1c#:~:text=This%20article%20is%20a%20walkthrough%20to%20creating%20a%20basic%20level
    // https://dev.to/alexmercedcoder
    // Alex Merced
  try {
      const { fullName, idNumber, accountNumber, password } = req.body;

      if (!fullName || !idNumber || !accountNumber || !password) {
          return res.status(400).json({ message: "All fields are required" });
      }

      if (!validator.isAlpha(fullName.replace(/\s/g, ''), 'en-US')) {
          return res.status(400).json({ message: "Full name can only contain letters and spaces" });
      }

      if (!validator.isLength(idNumber, { min: 13, max: 13 }) || !validator.isNumeric(idNumber)) {
          return res.status(400).json({ message: "ID number must be a 13-digit number" });
      }

      if (!validator.isLength(accountNumber, { min: 10, max: 10 }) || !validator.isNumeric(accountNumber)) {
          return res.status(400).json({ message: "Account number must be a 10-digit number" });
      }

      if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1 })) {
          return res.status(400).json({ message: "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, and a number" });
      }
      const sanitizedIdNumber = validator.escape(idNumber);
      const sanitizedAccountNumber = validator.escape(accountNumber);

      const existingUser = await User.findOne({ 
          $or: [{ idNumber: sanitizedIdNumber }, { accountNumber: sanitizedAccountNumber }]
      });
      if (existingUser) {
          return res.status(400).json({ message: "ID number or account number already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({ fullName, idNumber, accountNumber, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
      console.error(`Something went wrong: ${err}`);
      res.status(500).json({ message: 'Server error', error: err.message });
  }
};



const login = async (req, res) =>{
    // This method was adapted from dev
    // https://dev.to/alexmercedcoder/basic-authentication-with-node-express-and-mongo-1a1c#:~:text=This%20article%20is%20a%20walkthrough%20to%20creating%20a%20basic%20level
    // https://dev.to/alexmercedcoder
    // Alex Merced
    try {
      const { username, accountNumber, password } = req.body;

      if (!username || !accountNumber || !password) {
          return res.status(400).json({ message: "All fields are required" });
      }

      if (!validator.isAlpha(username.replace(/\s/g, ''), 'en-US')) {
          return res.status(400).json({ message: "Username can only contain letters and spaces" });
      }

      if (!validator.isLength(accountNumber, { min: 10, max: 10 }) || !validator.isNumeric(accountNumber)) {
          return res.status(400).json({ message: "Account number must be a 10-digit number" });
      }

      const sanitizedUsername = validator.escape(username);
      const sanitizedAccountNumber = validator.escape(accountNumber);

      const user = await User.findOne({ 
          $and: [
              { fullName: sanitizedUsername }, 
              { accountNumber: sanitizedAccountNumber }
          ]
      });
      
      if (!user) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
    
        // Check the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
    
        //Create a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SEC, { expiresIn: "1h" });
        console.log({ token }, { userId: user._id})
        res.status(200).json({ token, userId: user._id });
      } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
      }
}


module.exports = { register, login }