import express from 'express';
import { login, refreshAccessToken, register } from './user.controller.js';
import { registerMiddleware } from './user.middlewares.js';

const router = express.Router();

// Public routes
router.post('/register', registerMiddleware ,register);
router.post('/login', login);
router.get('/refresh-token', refreshAccessToken);


export default router;
