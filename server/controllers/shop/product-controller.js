import Product from "../../models/productModel.js";

export const getFilteredProducts = async (req,res) => {
    try {
        
        const products = await Product.find({})

        res.status(200).json({ success : true , data : products})

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal Server Error !! -getFilteredProducts'})
    }
}