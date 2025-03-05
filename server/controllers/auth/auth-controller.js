import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/userModel.js'



//register
export const registerUser = async (req, res) =>{

    const {userName, email , password} = req.body;
    console.log(req.body)
    try {
        
        const hashPassword = await bcrypt.hash(password, 10); 
        const newUser = new User({
            userName,
            email,
            password : hashPassword
        })
        
        await newUser.save();
        res.status(200).json({ success: true, message: 'User Created Successfully !!'})
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal Server Error !! -register'})
    }
} 

//login
const login = async (req, res)=>{
    try {
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal Server Error !! -register'})
    }
}




//logout





//auth middleware