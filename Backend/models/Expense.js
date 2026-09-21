const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    amount:{
        type:Number,
        required:true,
        min:0,
    },
    category:{
        type:String,
        enum:["Food","Travel","Bills","Shopping","Entertainment","Health","Groceries","Other"],
        default:"Other",
    },
    categorySource:{
        type:String,
        enum:["AI","manual"],
        default:"AI",
    },
    date:{
        type:Date,
        default:Date.now
    },
    },  
    {
        timestamps:true
    });

    module.exports=mongoose.model("Expense",expenseSchema);