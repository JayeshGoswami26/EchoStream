// This is reusable code 

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
})

const uploadFilesOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return

        const response = await cloudinary.uploader.upload( localFilePath , {
            resource_type : 'auto'
        } )
        // console.log(`File uploaded successfully ${response.url} `)
         fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath) // this will will remove the temporary file as the upload operations got failed 
        console.log(`File uploading failed :: Error :: ${error.message}`)
        return null
    }
}

export { uploadFilesOnCloudinary }