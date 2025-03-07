import { imageUploadUtils } from "../../config/cloudinary.js";


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