import express from 'express';
import { login } from './user.controller.js';

const router = express.Router();

// Public routes
// router.post('/register', registerUser);
router.post('/login', login);

export default router;
