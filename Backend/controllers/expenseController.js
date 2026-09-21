const Expense =require("../models/Expense");
const categorizeExpense = require("../utils/aiCategorize");

// @route  POST /api/expenses

const addExpense =async(req, res)=>{
  try{
    const{description, amount,category, date} =req.body;

    if(!description || amount == undefined){
      return res.status(400).json({message:"Description and amount are required"});   
    }

    let finalCategory;
    let categorySource;

    if(category){
      //User provided a category manually - trust it and skip AI call
      finalCategory = category;
      categorySource = "manual";
    }else{
      //No category given - let AI classify based on description
      const result = await categorizeExpense(description);
      finalCategory = result.category;
      categorySource = result.source;
    }

    const expense =await Expense.create({
      userId : req.user._id,
      description,
      amount,
      category: finalCategory,
      categorySource,
      date: date || Date.now(),
    });

    res.status(201).json(expense);
  }
  catch(error){
    res.status(500).json({
      message:"Server error", error:error.message
    })
  }
};

// @route  GET /api/expenses
const getExpenses = async(req, res)=>{
  try{
    const expenses = await Expense.find({userId: req.user._id}).sort({date: -1});
    res.json(expenses);
  }
  catch(error){
    res.status(500).json({
      message:"Server error", error:error.message
    });
  }
};

// @route  PUT /api/expenses/:id
const updateExpense = async(req, res)=>{
  try{
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    if (expense.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this expense' });
    }

    const { description, amount, category, date } = req.body;

    if (description !== undefined) expense.description = description;
    if (amount !== undefined) expense.amount = amount;
    if (date !== undefined) expense.date = date;

    // If the user changes the category manually, mark the source accordingly
    if (category !== undefined) {
      expense.category = category;
      expense.categorySource = 'manual';
    }

    await expense.save();
    res.json(expense);
  }
  catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  DELETE /api/expenses/:id
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    if (expense.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this expense' });
    }

    await expense.deleteOne();
    res.json({ message: 'Expense removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

//@route  GET/api/expenses/summary
const getSummary = async(req,res)=>{
  try{
    const userId = req.user._id;

    // Total spending grouped by category — feeds a pie/bar chart
    const byCategory = await Expense.aggregate([
      {$match: { userId }},
      {$group: { _id:'$category', total: {$sum:'$amount'}}},
      {$sort: { total :-1}},
    ]);

    // Total spending grouped by month — feeds a line/bar chart over time
    const byMonth = await Expense.aggregate([
      {$match: { userId }},
      {
        $group: {
          _id: {year:{$year: '$date'}, month:{$month: '$date'}},
          total : {$sum : '$amount'},
        },
      },
      {$sort : {'_id.year':1, '_id.month':1}},
    ]);

    // Overall total — handy for a summary card at the top of the dashboard
    const overallTotal = byCategory.reduce((sum,c)=> sum+ c.total, 0);

    res.json({
      totalSpent : overallTotal,
      byCategory : byCategory.map((c)=>({category: c._id, total: c.total})),
      byMonth : byMonth.map((m)=>({
        year : m._id.year,
        month: m._id.month,
        total: m.total
      })),
    });
  }
  catch(error){
    res.status(500).json({message: 'server error', error:err.message});
  }
};


module.exports={
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getSummary
};