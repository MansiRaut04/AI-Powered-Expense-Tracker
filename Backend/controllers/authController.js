const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn: "30d"});
};


const signup = async(req, res)=>{
    try{
        const {name, email, password} = req.body;
        if(!name || !email ||!password){
            return res.status(400).json({
                message:"Please provide name, email, password"
            });
        }
        const Userexist = await User.findOne({email});
        if(Userexist){
            return res.status(400).json({
                message:"User already exists"
            });
        }
        console.log('About to create user...');

        const user =await User.create({name, email, password});
        console.log('User created successfully');
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email:user.email,
            token:generateToken(user._id),
        });

    }
    catch(error){
        res.status(500).json({
            message:"Server error", error:error.message
        });
    }
};

const login = async(req, res) =>{
    try{
        const{email, password}= req.body;
        if(!email || !password){
            return res.status(400).json({message:"Please Provide email and password"});
        }
        const user = await User.findOne({email});
        const ismatch = user && (await bcrypt.compare(password, user.password));
        
        if(!ismatch){
            return res.status(401).json({message:"Invalid email or password"});
        }
        res.json({
            _id:user._id,
            name:user.name,
            email: user.email,
            token:generateToken(user._id)
        });
    }
    catch(error){
        res.status(500).json({message:"Server error", error:error.message});
    }
};

module.exports={signup, login};