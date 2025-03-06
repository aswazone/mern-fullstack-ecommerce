import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/userModel.js'



//register
export const registerUser = async (req, res) =>{

    const {userName, email , password} = req.body;
    console.log(req.body)
    try {

        const checkUser = await User.findOne({email})
        if(checkUser) return res.json({ success: false, message: 'User already exist with same Email !!'})
        
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
export const loginUser = async (req, res)=>{
    try {
        const {email, password} = req.body
        const checkUser = await User.findOne({email})
        if(!checkUser) return res.json({ success: false, message: "User doesn't exist !!"})
        
        const isMatch = await bcrypt.compare(password, checkUser.password)
        if(!isMatch) return res.json({ success: false, message: 'Incorrect Password ! Please try again'})

        //create token for 60 min
        const token = jwt.sign({
            id : checkUser._id,
            role : checkUser.role,
            email : checkUser.email
        },'CLIENT_SECRET_KEY',{ expiresIn : '60m'})

        //extra Aswin kp
        const name = (checkUser.userName).charAt(0).toUpperCase() + (checkUser.userName).slice(1).toLowerCase();

        res.cookie('token', token, {httpOnly: true , secure : false}).json({ 
            success: true, 
            message: `Welcome ${name}`,
            user: {
                id : checkUser._id,
                role : checkUser.role,
                email : checkUser.email
            }})

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal Server Error !! -login'})
    }
}

//logout
export const logoutUser = async (req, res) =>{
    res.clearCookie('token').json({
        success : true,
        message : 'Logout Successfully !!'
    })
}

//auth middleware (pazhaya middleware concept- check cheyyum aal indo nn !)
export const authMiddleware = async (req, res, next) =>{
    const token = req.cookies.token; //getting token from cokkies

    if(!token) return res.status(401).json({
        success : false,
        message : 'Unauthorized user !'
    })

    try {
        const decodedToken = jwt.verify(token, 'CLIENT_SECRET_KEY');
        req.user = decodedToken;
        next()
    } catch (err) {
        console.error(err);
        res.status(401).json({ success: false, message: 'Internal Server Error !! -authMiddleware'})
    }
}