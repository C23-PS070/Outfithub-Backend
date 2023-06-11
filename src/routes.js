const express = require('express');
const { body } = require('express-validator');
const controller = require('./controllers');
const { middleware } = require('./middlewares');

const router = express.Router();

// Register
router.post(
  '/register',
  [
    body('fullName').trim().notEmpty().withMessage('Full Name is required'),
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('password').trim().notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('confirmPassword').trim().notEmpty().withMessage('Confirm Password is required')
  ],
  controller.register
);

// Login
router.post(
  '/login',
  [
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('password').trim().notEmpty().withMessage('Password is required')
  ],
  controller.login
);

// Logout
router.post('/logout', middleware, controller.logout);

module.exports = router;
