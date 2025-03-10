import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const ProductSchema = new Schema({
    image: String,
    title : String,
    description : String,
    category : String,
    brand : String,
    price : Number,
    salePrice : Number,
    totalStock : Number
},{timestamps : true})

const Product = mongoose.model('Product', ProductSchema);

export default Product;