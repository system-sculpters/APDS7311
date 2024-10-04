const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const register = async (req, res) => {
    try {
        
        const { fullName, idNumber, accountNumber, password } = req.body;

        //Check if the username or email already exists
        const existingUser = await User.findOne({ $or: [{idNumber}, {accountNumber}]})
        if (existingUser) {
            return res.status(400).json({message: "idNumber or accountNumber already exists"})
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)
 
        //create a new user 
        const newUser = new User({ fullName, idNumber, accountNumber, password: hashedPassword});
        await newUser.save();

        res.status(201).json({message: "User registered successfully"})
    } catch (err) {
        console.log(`something went wrong: ${err}`)
        res.status(500).json({ message: 'Server error', error: err});
    }
}


const login = async (req, res) =>{
    try {
        const { username, accountNumber, password } = req.body;
    
        //Find the user by username
        const user = await User.findOne({ $and: [{fullName: username}, {accountNumber}]})
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