import { v2 as cloudinary } from 'cloudinary';
import { configDotenv } from 'dotenv';
import multer from 'multer'

configDotenv()

//--configuration
cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET
})


const storage = new multer.memoryStorage();

export const imageUploadUtils = async (file) =>{
    try {

        const result = cloudinary.uploader.upload(file, { resource_type : 'auto' });
        return result;

    } catch (err) {
        console.log(err, 'Cloudinary-error !!')
    }
}

export const upload = multer({storage});

