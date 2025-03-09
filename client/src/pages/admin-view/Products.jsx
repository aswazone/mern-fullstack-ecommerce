import ProductImageUpload from '@/components/admin-view/Image-upload'
import AdminProductTile from '@/components/admin-view/Product-tile'
import CommonForm from '@/components/common/form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config'
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from '@/store/admin/product-slice/productSlice'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'


const initialFormData = {
  image : null, 
  title : '',
  description : '',
  category : '',
  brand : '',
  price : '',
  salePrice : '',
  totalStock : ''
}



const AdminProducts = () => {

  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false)
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null)
  const [imageUploadState , setImageUploadState] = useState(false)
  const [currentEditId, setCurrentEditId] = useState(null);

  const {productList} = useSelector((state)=> state.adminProducts)
  const dispatch = useDispatch();

  //both edit and add functionality
  const onSubmit = (e) =>{
      e.preventDefault();

      if(currentEditId !== null){
        dispatch(editProduct({formData :{...formData , image : uploadedImageUrl },id:currentEditId}))
        .then((data)=>{
          console.log(data)
          if(data?.payload?.success){
            dispatch(fetchAllProducts())
            setOpenCreateProductsDialog(false)
            setImageFile(null);
            setFormData(initialFormData)
            toast('Product Edited Successfully !!')
          }else{
            toast(data?.payload?.message)
          }
        })
      }else{
        
        dispatch(addNewProduct({...formData , image : uploadedImageUrl}))
        .then((data)=>{
          console.log(data)
          if(data?.payload?.success){
            dispatch(fetchAllProducts())
            setOpenCreateProductsDialog(false)
            setImageFile(null);
            setFormData(initialFormData)
            toast('Product Added Successfully !!')
          }else{
            toast(data?.payload?.message)
          }
        })
      }

      // console.log(formData);
  }

  //delete item
  const handleDelete = (productId) => {
    if(productId !== null){
      dispatch(deleteProduct(productId))
        .then((data)=>{
          console.log(data);
          if(data?.payload?.success) {
            toast(data.payload.message);
            dispatch(fetchAllProducts())
          }else toast(data.payload.message)
        })
    }
  }

  //good and simple formValidation approach !!
  function isFormValid(){
    return Object.keys(formData).map((key)=> formData[key] !== "").every((item) => item) && uploadedImageUrl !== null;
  }

  

  useEffect(()=>{
    dispatch(fetchAllProducts())
  },[dispatch])
  
  // console.log(productList, uploadedImageUrl, 'productList',)
  console.log(formData, 'productList',)

  return (
    <>
        <div className="mb-5 w-full flex justify-end">
          <Button onClick={()=>setOpenCreateProductsDialog(true)}>Add New Product</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {
              productList && productList.length > 0 ? 
              productList.map(item => <AdminProductTile key={item._id} handleDelete={handleDelete} setUploadedImageUrl={setUploadedImageUrl} setFormData={setFormData} setCurrentEditId={setCurrentEditId} setOpenCreateProductsDialog={setOpenCreateProductsDialog} product={item}/> ) : null
            }
        </div>
        <Sheet 
          open={openCreateProductsDialog} 
          onOpenChange={()=>{
            setOpenCreateProductsDialog(false);
            setCurrentEditId(null);
            setUploadedImageUrl(null);
            setImageFile(null);
            setFormData(initialFormData);
          }}>
          <SheetContent side='right' className='overflow-auto '>
            <SheetHeader>
              <SheetTitle className='text-xl'>{currentEditId !== null ?  'Edit' : 'Add New' } Product</SheetTitle>
              <SheetDescription className='text-gray-300'>_________________________________________________________</SheetDescription>
            </SheetHeader>
              {
                uploadedImageUrl && <img src={uploadedImageUrl} className='w-[300px] h-[300px] object-cover rounded-lg mx-auto'/>
              }
              <ProductImageUpload isEditMode={currentEditId !== null} imageUploadState={imageUploadState} imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} setImageUploadState={setImageUploadState}/>
            <div className="py-6 px-4">
              <CommonForm isBtnDisabled={!isFormValid()} formData={formData} setFormData={setFormData} buttonText={ currentEditId !== null ?  'Edit' : 'Add' } formControls={addProductFormElements} onSubmit={onSubmit}/>
            </div>
          </SheetContent>
        </Sheet>
    </>
  )
}

export default AdminProducts