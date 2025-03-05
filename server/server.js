import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import connectDB from './config/db.js';
import dotenv from 'dotenv';

// mongoose.connect('mongodb+srv://aswamanu143:123@aswA@cluster0.sche8.mongodb.net/')
//     .then(()=> console.log('MongoDB connected !!'))
//     .catch((err) => console.error(err))

dotenv.config()
const app = express();  
connectDB();

//  --middleware--
app.use(cors({
    origin : 'http://localhost:5173/',
    methods : ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders : [
        'Content-Type',
        'Authorization',
        'Cache-Control',
        'Expires',
        'Pragma'
    ],
    credentials : true
}));

app.use(cookieParser());
app.use(express.json());


const PORT = process.env.PORT || 5000;




app.listen(PORT,()=>{
    console.log(`🚀 server is running on ${PORT}`)
})