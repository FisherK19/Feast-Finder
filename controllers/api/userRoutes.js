const express = require('express');
const router = express.Router();
const userController = require('../userController');

// GET all users
router.get('/', userController.getAllUsers);

// GET single user by ID
router.get('/:id', userController.getUserById);

// POST create a new user
router.post('/', userController.createUser);

// PUT update an existing user
router.put('/:id', userController.updateUser);

// DELETE a user
router.delete('/:id', userController.deleteUser);

module.exports = router;

