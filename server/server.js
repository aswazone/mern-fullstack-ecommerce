import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import authRouter from './routes/auth/auth-routes.js'
import adminProductsRouter from './routes/admin/products-routes.js'

dotenv.config()
const app = express();  
connectDB();

//  --middleware--
app.use(cors({
    origin : 'http://localhost:3000',
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
app.use('/api/auth', authRouter)
app.use('/api/admin/products', adminProductsRouter)


const PORT = process.env.PORT || 5000;




app.listen(PORT,()=>{
    console.log(`🚀 server is running on ${PORT}`)
})