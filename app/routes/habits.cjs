const express = require('express');
const router = express.Router();

(async () => {
    const { createHabit, getHabits, deleteHabit } = await import('../controllers/habitController.js');
    
    router.post('/', createHabit);
    router.get('/', getHabits);
    router.delete('/:id', deleteHabit);
})();

// Add more routes as needed

module.exports = router;
