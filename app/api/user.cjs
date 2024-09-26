const { Router } = require('express'); // Changed from import to require

const router = Router();

// Define your user routes here
router.get('/', (req, res) => {
    res.send('User route');
});

// Export the router
module.exports = router; // Replace 'export default router;' with this