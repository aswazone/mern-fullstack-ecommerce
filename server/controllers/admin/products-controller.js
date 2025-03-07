import { imageUploadUtils } from "../../config/cloudinary.js";
import Product from "../../models/productModel.js";


export const handleImageUpload = async (req,res) =>{
    try {
        // handles image uploads and converts the uploaded image into a Base64 URL
        // req.file.buffer contains the raw binary data of the uploaded image. converts the binary data into a Base64 string. 
        // req.file.mimetype ensures the correct image format (e.g., image/png, image/jpeg).

        const b64 = Buffer.from(req.file.buffer).toString('base64')  
        const url = 'data:' + req.file.mimetype + ';base64,' + b64;  // Ex : data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...   

        const result = await imageUploadUtils(url);

        res.status(200).json({ success : true , result })

    } catch (err) {
        console.log(err);
        res.status(500).json({success: false , message: 'Internal Server Error !! -handleImageUpload'})
    }
}

// add a new products
export const addProduct = async (req, res) =>{
    try {

        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;

        const newlyCreatedProduct = new Product({ 
            image, 
            title, 
            description, 
            category, 
            brand, 
            price, 
            salePrice, 
            totalStock 
        })

        await newlyCreatedProduct.save()
        return res.status(200).json({ success : true , data : newlyCreatedProduct })
        
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false , message: 'Internal Server Error !! -addProduct'})
    }
}
// fetch all products
export const fetchAllProducts = async (req, res) =>{
    try {
        const listOfProducts = await Product.find({});
        return res.status(200).json({ success : true , data : listOfProducts })
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false , message: 'Internal Server Error !! -fetchAllProducts'})
    }
}
// edit a product
export const editProduct = async (req, res) =>{
    try {

        const {id} = req.params;
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;
        
        const findProduct = await Product.findById(id);
        
        if(!findProduct) return res.status(404).json({success: false , message: 'Product not found !!'});

        findProduct.title = title || findProduct.title
        findProduct.description = description || findProduct.description
        findProduct.category = category || findProduct.category
        findProduct.brand = brand || findProduct.brand
        findProduct.price = price || findProduct.price
        findProduct.salePrice = salePrice || findProduct.salePrice
        findProduct.totalStock = totalStock || findProduct.totalStock
        findProduct.image = image || findProduct.image

        await findProduct.save();

        return res.status(200).json({ success : true , data : findProduct })
        
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false , message: 'Internal Server Error !! -editProduct'})
    }
}
//delete a product
export const deleteProduct = async (req, res) =>{
    try {

        const {id} = req.params;

        const product = await Product.findByIdAndDelete(id);

        if(!product) return res.status(200).json({success: true , message: 'Product deleted successfully !!'});

        
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false , message: 'Internal Server Error !! -deleteProduct'})
    }
}