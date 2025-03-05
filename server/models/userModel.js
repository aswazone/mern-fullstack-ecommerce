import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema ({
    username: {
        type : String,
        require : true,
    },
    email: {
        type : String,
        require : true, 
        unique : true
    },
    password: {
        type : String,
        require : true,
    },
    role : {
        type : String,
        default : 'user'
    }
},{timestamps:true})

const User = mongoose.model('User', UserSchema);
export default User;