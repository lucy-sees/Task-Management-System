// src/routes/tasks.js
const express = require('express');
const TaskController = require('../controllers/TaskController');
const router = express.Router();

router.get('/', TaskController.getAllTasks);
router.post('/', TaskController.createTask);
router.get('/:id', TaskController.getTaskById);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

module.exports = router;
