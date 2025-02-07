import express from 'express';
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
  res.send('Event route');
});

export default router;  // Export the router using ES module syntax
