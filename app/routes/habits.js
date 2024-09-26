const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');

router.post('/', habitController.createHabit);
router.get('/', habitController.getHabits);
router.delete('/:id', habitController.deleteHabit);

// Add more routes as needed

module.exports = router;
