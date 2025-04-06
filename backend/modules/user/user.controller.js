import bcrypt from 'bcryptjs';
import { User } from './user.model.js';
import jwt from 'jsonwebtoken';
import { generateRefreshToken, generateToken } from '../../utils/generateToken.js';


// Register new user
async function register(req, res) {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newEntry = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Remove password before sending response
    const userResponse = { ...newEntry._doc };
    delete userResponse.password;

    res.status(201).json({
      message: 'User registered successfully',
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Login user
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Remove password before sending response
    const userResponse = { ...user._doc };
    delete userResponse.password;

    let token =  generateToken(user._id) ;
    const refreshToken = generateRefreshToken(user._id);



    res.status(200).json({
      message: 'Login successful',
      user: userResponse,token, refreshToken
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function refreshAccessToken(req, res) {
    console.log(req.headers)
    try {
      const token = req.headers.refreshtoken;
      console.log(token)
      if (!token) return res.status(401).json({ message: 'No refresh token provided' });
  
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      const user = await User.findById(decoded.id).select('-password');
  
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const newAccessToken = generateToken(user._id);
  
      res.status(200).json({ token: newAccessToken });
    } catch (err) {
      res.status(401).json({ message: 'Invalid or expired refresh token' });
    }
  }
  

export {
  login,
  register,
  refreshAccessToken
};
