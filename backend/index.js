import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // MongoDB connection function
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from './modules/user/user.routes.js';

dotenv.config();

// Connect to MongoDB

connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Test route
app.get('/', (req, res) => {
  res.send('API is running... 🚀');
});
app.use("/users" , userRoutes)

// console.log(process.env)
// 
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
