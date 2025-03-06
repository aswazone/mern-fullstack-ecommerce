import React, { useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';

const ProductImageUpload = ({imageFile, setImageFile ,uploadedImageUrl , setUploadedImageUrl}) => {

    const inputRef = useRef(null);

    const handleImageFileChange = (e) =>{
        // console.log(e.target.files)
        const selectedFile = e.target.files?.[0]
        if(selectedFile) setImageFile(selectedFile); //photo kittya save aakkumh.
    } 

    const handleDragOver = (e) =>{
        console.log(e)
        e.preventDefault()
    }
    const handleDrop = (e) =>{
        console.log(e)
        e.preventDefault() 
        const droppedFile = e.dataTransfer.files?.[0];
        if(droppedFile) setImageFile(droppedFile); 
    }
    
    const handleRemoveImage = (e) =>{
        console.log(e)
        setImageFile(null);
        if(inputRef.current) inputRef.current.value = ''
    }

  return (
    <div className='w-full max-w-md mx-auto px-4'>
        <Label className='text-lg font-semibold mb-2 block'>Upload image</Label>
        <div onDragOver={handleDragOver} onDrop={handleDrop} className='border-2 border-dashed rounded-lg p-4'>
            <Input id='image-upload' type='file' className='hidden' ref={inputRef} onChange={handleImageFileChange}/>
            {
                !imageFile ? 
                    <Label htmlFor='image-upload' className='flex flex-col items-center justify-center h-32 cursor-pointer'>
                        <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2'/>
                        <span>Drag & drop or click to upload image</span>
                    </Label> : 
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <FileIcon className='w-8 text-primary mr-2 h-8'/>
                        </div>
                        <p className='text-sm font-medium'>{imageFile.name}</p>
                        <Button variant='ghost' size='icon' className='text-muted-foreground hover:text-foreground' onClick={handleRemoveImage}>
                            <XIcon className='w-4 h-4'/>
                            <span className='sr-only'>Remove File</span>
                        </Button>
                    </div>
            }
        </div>
    </div>
  )
}

export default ProductImageUpload