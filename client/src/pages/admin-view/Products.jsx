import ProductImageUpload from '@/components/admin-view/Image-upload'
import AdminProductTile from '@/components/admin-view/Product-tile'
import CommonForm from '@/components/common/form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config'
import { addNewProduct, fetchAllProducts } from '@/store/admin/product-slice/productSlice'
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
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [imageUploadState , setImageUploadState] = useState(false)

  const {productList} = useSelector((state)=> state.adminProducts)
  const dispatch = useDispatch();

  const onSubmit = (e) =>{
      e.preventDefault();

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

      // console.log(formData);
  }

  useEffect(()=>{
    dispatch(fetchAllProducts())
  },[dispatch])

  console.log(productList, uploadedImageUrl, 'productList',)

  return (
    <>
        <div className="mb-5 w-full flex justify-end">
          <Button onClick={()=>setOpenCreateProductsDialog(true)}>Add New Product</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {
              productList && productList.length > 0 ? 
              productList.map(item => <AdminProductTile product={item}/> ) : null
            }
        </div>
        <Sheet open={openCreateProductsDialog} onOpenChange={()=>setOpenCreateProductsDialog(false)}>
          <SheetContent side='right' className='overflow-auto '>
            <SheetHeader>
              <SheetTitle className='text-xl'>Add New Product</SheetTitle>
            </SheetHeader>
              <ProductImageUpload imageUploadState={imageUploadState} imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} setImageUploadState={setImageUploadState}/>
            <div className="py-6 px-4">
              <CommonForm formData={formData} setFormData={setFormData} buttonText='Add' formControls={addProductFormElements} onSubmit={onSubmit}/>
            </div>
          </SheetContent>
        </Sheet>
    </>
  )
}

export default AdminProducts