const express = require("express");
const app = express();
app.use(express.json());

require("dotenv").config();

const cors = require("cors");
app.use(cors());

const connectDB = require("./config/db");
connectDB();

app.get("/api/health", (req,res)=>{
    res.json({status:"ok"});
});

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const expenseRoutes = require('./routes/expenseRoutes');
app.use('/api/expenses', expenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})