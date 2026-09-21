const express = require('express');
const protect = require('../middleware/authMiddleware');
const {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getSummary,
} = require('../controllers/expenseController');

const router = express.Router();

router.use(protect); // every route below requires auth

router.post('/', addExpense);
router.get('/summary', getSummary);  
router.get('/', getExpenses);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;